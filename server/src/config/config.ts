import { config } from "dotenv";

config();

type DatabaseType = "postgres" | "mysql" | "mongodb";

const configEnv = {
  DB_TYPE: process.env.DB_TYPE as DatabaseType,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: parseInt(process.env.DB_PORT, 10),
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
}

export default configEnv;
