import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const {
  POSTGRES_USERNAME,
  POSTGRES_HOST,
  POSTGRES_DATABASE,
  POSTGRES_DATABASE_TEST,
  POSTGRES_PASS,
} = process.env;

const db = new Pool({
  host: POSTGRES_HOST,
  database:
    process.env.NODE_ENV == "DEV" ? POSTGRES_DATABASE : POSTGRES_DATABASE_TEST,
  user: POSTGRES_USERNAME,
  password: POSTGRES_PASS,
});

export default db;
