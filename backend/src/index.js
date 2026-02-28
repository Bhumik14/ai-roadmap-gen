import app from "./app.js";
import dotenv from "dotenv";

import db from './config/db.js';

dotenv.config();

const port = process.env.port || 3000;

async function checkSupabaseConnection() {
  try{
    const result = await db`SELECT NOW()`;
    console.log("Database connected successfully");
  }
  catch{
    console.log("Database Connection failed")
  }

}

await checkSupabaseConnection();

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
