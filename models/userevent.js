'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserEvent = sequelize.define('UserEvent', {
    user_id: DataTypes.INTEGER,
    event_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return UserEvent;
};
