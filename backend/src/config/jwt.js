import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
export function signToken(payload){
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN}
    )
}