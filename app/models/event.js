module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    organization_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        Event.belongsToMany(models.User, {
          through: 'User_Events',
          foreignKey: 'event_id',
        });
      },
    },
  });
  return Event;
};
