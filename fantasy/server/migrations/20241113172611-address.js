'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('address', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      userId:{
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      address:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      country:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:"Canada"
      },
      province:{
        type: Sequelize.ENUM('NS', 'NB','NL', 'PE'),
        allowNull: false,
        defaultValue: 'NS',
      },
      city:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      postalCode:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('address');
  }
};
