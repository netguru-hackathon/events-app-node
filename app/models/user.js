'use strict';

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    slack_id: DataTypes.STRING,
    token: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsToMany(models.Event, {
          through: 'User_Events',
          foreignKey: 'user_id'
        })
      }
    }
  });
  return User;
};
