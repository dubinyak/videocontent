'use strict';

const config = require('../config');
const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      },
      set (value) {
        this.setDataValue('email', value.toLowerCase());
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 64],
          msg: 'Password must be 6-64 in length'
        }
      }
    },
    isPassword: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'users'
  });

  const hookPassword = async (instance, options) => {
    if (!instance.changed('password')) return;
    const hash = await bcrypt.hash(instance.password, config.saltRounds);
    instance.password = hash;
  };

  user.beforeCreate(hookPassword);
  user.beforeUpdate(hookPassword);

  user.prototype.isValidPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

  user.associate = (models) => {
    user.hasMany(models.video);
    user.belongsTo(models.role);
  };

  return user;
};

