import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/db";
import User from "../auth/auth.model";

class Cart extends Model {
  public id!: string;
  public userId!: string;
  public type!: string;

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
      type: DataTypes.UUID,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("cart", "saveforlater"),
      allowNull: false,
      defaultValue: "cart",
    },
  },
  {
    sequelize,
    tableName: "cart",
  }
);

Cart.belongsTo(User, { foreignKey: "userId", as: "user" });

export default Cart;
