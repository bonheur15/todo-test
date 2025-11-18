import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

// Check if DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in .env");
}

const connection = await mysql.createConnection(process.env.DATABASE_URL);

export const db = drizzle(connection, { schema, mode: "default" });
