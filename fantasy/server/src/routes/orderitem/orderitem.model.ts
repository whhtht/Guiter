import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/db";

import Order from "routes/order/order.model";
import Product from "routes/products/products.model";

class Orderitem extends Model {
  public id!: string;
  public orderId!: string;
  public productId!: string;
  public price!: number;
  public quantity!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Orderitem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "orderitem",
  }
);

Orderitem.belongsTo(Order, { foreignKey: "orderId", as: "order" });
Orderitem.belongsTo(Product, { foreignKey: "productId", as: "product" });

export default Orderitem;
