import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const database = process.env.DB_DATABASE;

const db_string = `postgres://${user}:${password}@${host}:${port}/${database}`;

const { Pool } = pg;
export const pgPool = new Pool({ connectionString: db_string });
