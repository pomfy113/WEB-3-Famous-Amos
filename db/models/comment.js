'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    content: {type: DataTypes.STRING, validate: { len: [1, 240] }}
  });

  Comment.associate = function(models){
      Comment.belongsTo(models.Pet);
  };

  return Comment;
};
