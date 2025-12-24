import pkg from "pg";
import dotenv from "dotenv";
import setupDB from "./setup-db.js";

dotenv.config();

const { Pool } = pkg;
export const pool = new Pool({
    host: process.env.DB_HOST,
    post: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    // ssl: process.env.DB_SERVICE,
});

pool.on("connect", () => {
    console.log(`Connected to PostgreSQL at ${process.env.DB_PORT}`);
})
pool.on("error", (err) =>{
    console.error("Error while connecting to DB:", err);
})

export async function initDB() {
    await pool.query("SELECT 1");
    console.log("Database Verified");

    await setupDB();
    console.log("DB Schema Verified");
}
