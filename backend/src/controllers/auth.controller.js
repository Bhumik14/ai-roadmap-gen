import { pool } from '../db/db.js';
import bcrypt from 'bcrypt';
import { signToken} from "../config/jwt.js";

export async function registerController(req, res) {
    try{
        const { name, email, password } = req.body;
        if(!name || !email || !password){
            return res.status(400).json({error: "All Fields are required"});
        }

        const existingUser = await pool.query(
            'SELECT id FROM users WHERE email=$1',
            [email]
        );
        if(existingUser.rows.length > 0){
            return res.status(400).json({error: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            `INSERT INTO users (name, email, password) 
             VALUES ($1, $2, $3)
             RETURNING id, name, email, password`,
            [name, email, hashedPassword],
        )

        const user = result.rows[0];
        const token = signToken({userId: user.id, email: user.email});
        res.status(201).json({message: "User registered Sucessfully", token, user});

    }
    catch(err){
        console.error('Error in Registeration Controller: ', err);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export async function loginController(req, res) {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({error: "All Fields are required"});
        }
        const result = await pool.query(
            'SELECT id, name, email, password FROM users WHERE email=$1',
            [email]
        )
        if(result.rows.length === 0){
            return res.status(400).json({error: "Invalid email"});
        }
        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({error: "Invalid password"});
        }

        const token = signToken({userId: user.id, email: user.email});
        res.status(200).json({
            message: "Login Sucessfully",
            token,
            user: user.email,
        })
    }
    catch(err){
        console.error('Error in Login Controller: ', err);
        res.status(500).json({error: "Internal Server Error"});
    }
}