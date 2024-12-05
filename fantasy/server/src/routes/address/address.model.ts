import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/db";
import User from "../auth/auth.model";

class Address extends Model {
  public id!: string;
  public userId!: string;
  public name!: string;
  public phone!: string;
  public address!: string;
  public country!: string;
  public province!: string;
  public city!: string;
  public postalCode!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Address.init(
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    province: {
      type: DataTypes.ENUM("NS", "NL", "NB", "PE"),
      allowNull: false,
      defaultValue: "NS",
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "address",
  }
);

Address.belongsTo(User, { foreignKey: "userId", as: "user" });

export default Address;
