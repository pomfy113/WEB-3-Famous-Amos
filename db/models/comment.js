'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    content: DataTypes.STRING
  });

  Comment.associate = function(models){
      Comment.belongsTo(models.Pet);
  };

  return Comment;
};
