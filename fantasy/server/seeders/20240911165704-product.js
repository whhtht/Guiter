'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const specification = await queryInterface.sequelize.query(
      `SELECT * FROM specification ;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    console.log("id:", specification);

    await queryInterface.bulkInsert ('products', [
      {
        id: uuidv4(),
        name: "Gibson LC Century of Progress 1933",
        price: 299.99,
        specification: "182ecd78-3cbd-4339-ab9c-40d5c3591f94",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: "Fender USA 2013 American Vintage '65 Jazzmaster",
        price: 199.99,
        specification: "e7b0b2fa-5fdf-4a55-ad4a-728ee56706ca",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: "first test",
        price: 300,
        specification: "028618f8-51b5-4b5f-b9be-f4b6780ffa9d",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: "second test",
        price: 200,
        specification: "26c8515f-d233-4cf8-acc1-de829bc0ec82",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: "third test",
        price: 100,
        specification: "cec9461f-b404-4a8f-bb40-e39099a79768",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: "fifth test",
        price: 0,
        specification: "25365aa4-d9c3-4281-8edf-0144bd6b449e",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: "hello",
        price: 299.99,
        specification: "b89df0ba-f6b1-4671-a8c5-935ad6305d64",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: "hi",
        price: 199.99,
        specification: "bcd994f2-071a-4fd0-88b7-bda7c43b04bf",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
