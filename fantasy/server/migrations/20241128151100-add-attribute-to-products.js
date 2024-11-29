'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('products', 'attribute', {
      type: Sequelize.ENUM('featured', 'newArrival'),
      allowNull: false, // 可根据需求更改为 false
      defaultValue: 'featured',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // 先移除 ENUM 列
    await queryInterface.removeColumn('products', 'attribute');
    
    // 删除 ENUM 类型（PostgreSQL 专用）
    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_products_attribute";');
    }
  },
};
