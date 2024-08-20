import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.PRODUCTS_DB_DATABASE,
  username: process.env.PRODUCTS_DB_USER,
  password: process.env.PRODUCTS_DB_PASSWORD,
  host: process.env.PRODUCTS_DB_HOST,
  port: parseInt(process.env.PRODUCTS_DB_PORT),
  dialect: "postgres",
});

export default sequelize;
