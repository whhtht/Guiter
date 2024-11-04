import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/db";

class User extends Model {
  public id!: string;
  public email!: string;
  public name!: string;
  public status!: string;
  public sub!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "unverified"),
      allowNull: false,
      defaultValue: "unverified",
    },
    sub: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "user",
  }
);

export default User;
