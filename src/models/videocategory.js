'use strict';

module.exports = (sequelize, Sequelize) => {
  const videocategory = sequelize.define('videocategory', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    videoId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    categoryId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    }
  }, {
    tableName: 'videocategories',
    paranoid: false,
    timestamps: false
  });

  videocategory.associate = (models) => {
    videocategory.belongsTo(models.video);
    videocategory.belongsTo(models.category);
  };

  return videocategory;
};
