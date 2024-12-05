import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/db";
import User from "routes/auth/auth.model";

class Order extends Model {
  public id!: string;
  public userId!: string;
  public paymentIntentId!: string;
  public type!: string;
  public status!: string;
  public name!: string;
  public email!: string;
  public phone!: string;
  public total!: string;
  public address!: string;
  public country!: string;
  public province!: string;
  public city!: string;
  public postalCode!: string;

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
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    paymentIntentId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "prepar",
        "ship",
        "deliver",
        "pickup",
        "cancel",
        "done"
      ),
      allowNull: false,
      defaultValue: "prepar",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    province: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "order",
  }
);

Order.belongsTo(User, { foreignKey: "userId", as: "user" });

export default Order;
