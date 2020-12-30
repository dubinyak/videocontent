'use strict';

module.exports = (sequelize, Sequelize) => {
  const category = sequelize.define('category', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    }
  }, {
    tableName: 'category',
    paranoid: false,
    timestamps: false
  });

  category.associate = (models) => {
    category.hasMany(models.videocategory);
  };

  return category;
};
