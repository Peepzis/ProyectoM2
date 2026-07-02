import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL || process.env.DB_URL;
const useSSL = process.env.NODE_ENV === "production";

const pool = connectionString
  ? new Pool({
      connectionString,
      ssl: useSSL ? { rejectUnauthorized: false } : false,
    })
  : new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

export default pool;