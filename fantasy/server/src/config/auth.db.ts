import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.AUTH_DB_DATABASE,
  username: process.env.AUTH_DB_USER,
  password: process.env.AUTH_DB_PASSWORD,
  host: process.env.AUTH_DB_HOST,
  port: parseInt(process.env.AUTH_DB_PORT),
  dialect: "postgres",
});

export default sequelize;
