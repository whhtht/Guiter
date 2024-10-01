import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/db";
import Product from "../products/products.model";
import Cart from "../cart/cart.model";
import User from "../auth/auth.model";

class Cartitem extends Model {
  public id!: string;
  public cartId!: string;
  public userId!: string;
  public productId!: string;
  public quantity!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Cartitem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    cartId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "cartitem",
  }
);

// 关联其他表
Cartitem.belongsTo(Cart, { foreignKey: "cartId", as: "cart" });
Cartitem.belongsTo(User, { foreignKey: "userId", as: "user" });
Cartitem.belongsTo(Product, { foreignKey: "productId", as: "product" });

export default Cartitem;
