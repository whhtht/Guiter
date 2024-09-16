import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/db";
import { Product, Specification } from "../products/products.model";

class Cart extends Model {
  public id!: string;
  public userId!: string;
  public productId!: string;
  public quantity!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Cart.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "cart",
  }
);

Cart.belongsTo(Product, { foreignKey: "productId", as: "product" });

export default Cart;
