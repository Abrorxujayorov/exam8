import "dotenv/config"
import { Router } from "express"
import { User } from "../models/user.models.js"
import bcrypt from "bcrypt"
export const login = Router();

login.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (username == null || password == null) {
            res.status(400).json({SUCCES: "Error"});
            return;
        }
        const user = await User.findOne({where: {username}});
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                res.status(201).json({message: "Login successful"});
            } else {
                res.status(400).json({error: "Invalid password"});
            }
            } else {
                res.status(400).json({error: "User not found"});
    }
    } catch (error) {
        console.error(error.message);
        return;
   }
})
