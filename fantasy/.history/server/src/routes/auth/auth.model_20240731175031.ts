import { Model, DataTypes } from "sequelize";
import sequelize from "../../config";

class Account extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public sub!: string;
  public requestId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Account.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    sub: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    requestId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "Accounts",
  }
);

export default Account;
