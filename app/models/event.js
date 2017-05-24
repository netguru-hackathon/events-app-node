'use strict';

module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    organization_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Event.belongsToMany(models.User, {
          through: 'User_Events',
          foreignKey: 'event_id',
        })
      }
    }
  });
  return Event;
};
