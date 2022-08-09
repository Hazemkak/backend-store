import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const {
  POSTGRES_USERNAME,
  POSTGRES_HOST,
  POSTGRES_DATABASE,
  POSTGRES_DATABASE_TEST,
  POSTGRES_PASS,
  ENV,
} = process.env;

const db = new Pool({
  host: POSTGRES_HOST,
  database: ENV == "DEV" ? POSTGRES_DATABASE : POSTGRES_DATABASE_TEST,
  user: POSTGRES_USERNAME,
  password: POSTGRES_PASS,
});

//   CREATE TABLE USER(
//     ID SERIAL PRIMARY KEY,
//     FIRSTNAME VARCHAR(50) NOT NULL,
//     LASTNAME VARCHAR(50) NOT NULL,
//     PASSWORD VARCHAR(50) NOT NULL
// );

export default db;
