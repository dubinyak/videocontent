'use strict';

module.exports = (sequelize, Sequelize) => {
  const videocategories = sequelize.define('videocategories', {
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

  videocategories.associate = (models) => {
    videocategories.belongsTo(models.video);
    videocategories.belongsTo(models.category);
  };

  return videocategories;
};
