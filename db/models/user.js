'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: {type: DataTypes.STRING, validate: { isEmail: true }},
    bio: DataTypes.STRING
})

  return User;
};
