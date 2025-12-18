import { pool } from "./db.js";
const createTablesSQL = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
async function setupDB() {
    try{
        await pool.query(createTablesSQL);
        console.log("Tables executed successfully.");
    }
    catch(err){
        console.error("Error creating tables:", err);
    }
}

export default setupDB;