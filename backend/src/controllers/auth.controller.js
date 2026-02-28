import bcrypt from "bcrypt";
import { signToken } from "../config/jwt.js";
import db from "../config/db.js";

// REGISTER
export async function registerController(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user exists
    const existingUser = await db`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Insert user
    const result = await db`
      INSERT INTO users (name, email, password_hash)
      VALUES (${name}, ${email}, ${password_hash})
      RETURNING id, name, email
    `;

    const user = result[0];

    // Generate token
    const token = signToken({
      userId: user.id,
      email: user.email,
    });

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user,
    });
  } catch (err) {
    console.error("Error in Registration Controller:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// LOGIN
export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Find user
    const result = await db`
      SELECT id, name, email, password_hash
      FROM users
      WHERE email = ${email}
    `;

    if (result.length === 0) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const user = result[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    //  Generate token
    const token = signToken({
      userId: user.id,
      email: user.email,
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Error in Login Controller:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
