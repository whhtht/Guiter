'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('specification', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      'Condition':{
        type: Sequelize.STRING,
        allowNull: true,
      },
      'Brand':{
        type: Sequelize.STRING,
        allowNull: true,
      },
      'Model':{
        type: Sequelize.STRING,
        allowNull: true,
      },
      'Finish':{
        type: Sequelize.STRING,
        allowNull: true,
      },
      'Categories':{
        type: Sequelize.STRING,
        allowNull: true,
      },
      'Year':{
        type: DataTypes.STRING,
        allowNull: true,
      },
      'Series':{
        type: Sequelize.STRING,
        allowNull: true,
      },
      'Fretboard Material':{
        type: Sequelize.STRING,
        allowNull: true,
      },
      'Pickup Configuration':{
        type: Sequelize.STRING,
        allowNull: true,
      },
      'Scale Length':{
        type: DataTypes.STRING,
        allowNull: true,
      },
      'Body Shape':{
        type: Sequelize.STRING,
        allowNull: true,
      },
      'Right/Left Handed':{
        type: Sequelize.STRING,
        allowNull: true,
      },
      'Number Of Strings':{
        type: Sequelize.STRING,
        allowNull: true,
      },
      'Neck Material':{
        type: Sequelize.STRING,
        allowNull: true,
      },
      'Color Family':
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
      'Model Family':
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
      'Finish Style':
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
      'Body Type':
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
      'Offset Body':
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
      'Bridge/Tailpiece Type':
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
      'Neck Construction':
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
      'Number Of Frets':
      {
        type: DataTypes.STRING,
        allowNull: true,
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
    }),
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.STRING,
        allowNull: false
      },
      specification: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'specification',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
    await queryInterface.dropTable('specification');
  }
};
