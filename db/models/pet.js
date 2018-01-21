'use strict';
module.exports = (sequelize, DataTypes) => {
  var Pet = sequelize.define('Pet', {
    name: DataTypes.STRING,
    species: DataTypes.STRING,
    birthday: DataTypes.DATE,
    favoriteFood: DataTypes.STRING,
    picUrl: DataTypes.STRING,
    picUrlSq: DataTypes.STRING,
    description: DataTypes.TEXT
  });

  Pet.associate = function(models){
      Pet.hasMany(models.Comment)
  }
  // Change later: CLASS.associate = function(models) {
  // CLASS.belongsTo(models.whateveritbelongsto)}
  return Pet;
};
