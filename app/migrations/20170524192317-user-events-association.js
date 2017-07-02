'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('User_Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      event_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Events',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      role: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('User_Events');
  }
};
