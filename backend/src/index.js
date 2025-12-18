import app from './app.js';
import dotenv from "dotenv";
import { initDB } from "./db/db.js";
dotenv.config();

const port = process.env.port || 3000;

async function start(){
    try{
        await initDB();
    }
    catch(e){
        console.error("Failed to init DB:", e);
    }
}
start();
app.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
})


