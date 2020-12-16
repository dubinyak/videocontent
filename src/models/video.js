'use strict';

module.exports = (sequelize, Sequelize) => {
  const video = sequelize.define('video', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true
    },
    satus: {
      type: Sequelize.ENUM(
        'new', 'busy', 'done', 'error'
      )
    },
    originalVideoUrl: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    transformedVideoUrl: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    thumbnailUrl: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'videos',
    paranoid: false,
    timestamps: true
  });

  video.associate = (models) => {
    video.belongsTo(models.user);
    video.hasMany(models.videocategories);
  };

  return video;
};
