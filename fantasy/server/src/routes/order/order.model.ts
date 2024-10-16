import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/db";
import User from "routes/auth/auth.model";
import Product from "../products/products.model";

class Order extends Model {
  public id!: string;
  public paymentIntentId!: string;
  public user!: string;
  public product!: string;
  public price!: number;
  public quantity!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    paymentIntentId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "order",
  }
);

Order.belongsTo(User, { foreignKey: "user", as: "user" });
Order.belongsTo(Product, { foreignKey: "product", as: "product" });

export default Order;
