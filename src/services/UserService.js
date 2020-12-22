'use strict';

const { jwt } = require('../libs');
const errors = require('../errors');
const { throwErrorWithCode } = require('../utils');
const models = require('../models');
const { sequelize: { sequelize: seq } } = require('../loaders');
const { required } = require('../utils');
const config = require('../config');

class UserService {
  static async getUserByToken (token) {
    return this._getByToken(process.env.JWT_SECRET, token);
  }

  static async createToken (user) {
    return jwt.encode(
      { id: user.id },
      process.env.JWT_SECRET,
      config.auth.tokenLifetimeSeconds);
  }

  static async getUserByEmailAndPassword (email, password) {
    const user = await models.user.findOne({
      where: {
        email: email.toLowerCase()
      },
      include: {
        model: models.role,
        required: true
      }
    });
    if (!user) throwErrorWithCode('User not found');
    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) throwErrorWithCode('User not found');
    return user;
  }

  static async createUser ({
    email,
    password
  }) {
    return this._create({
      email: email,
      password: password,
      role: 'user'
    });
  }

  static async _create ({
    email = required(),
    password = required(),
    role = required()
  } = {}) {
    const model = models.user;
    const roleModel = models.role;

    return seq.transaction(async t => {
      const prev = await model.findOne({
        transaction: t,
        where: {
          email: email.toLowerCase()
        }
      });
      if (prev) throwErrorWithCode('Email alredy used', errors.EMAIL_USED);

      const r = await roleModel.findOne({
        attributes: ['id'],
        where: {
          name: role
        },
        transaction: t
      });
      if (!r) throw new Error('No role');
      const user = await model.create({
        email: email,
        password: password,
        roleId: r.id
      }, { transaction: t });
      return user;
    });
  }

  static async _getByToken (secret, token) {
    const data = await jwt.decode(token, secret);
    const id = data.id;
    const user = await models.user.findOne({
      where: {
        id: id
      },
      include: [{
        model: models.role,
        required: true
      }, {
        model: models.profile,
        required: true
      }]
    });
    if (!user) throw new Error('User not found');

    return user;
  }
}

module.exports = UserService;
