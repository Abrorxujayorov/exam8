import "dotenv/config";
import { Router } from "express";
import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import { genToken } from "../../utils/Token/token.helper.js";
import { Token } from "../models/tokens.js";
import { adminsId } from "../../admins/adminId.js";

export const login = Router();

login.post("/signin", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (username == null || password == null) {
            res.status(400).json({ SUCCESS: "Error" });
            return;
        }
        const user = await User.findOne({ where: { username } });
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const payload = {
                    username,
                    isAdmin: user.id == adminsId ? true : false,
                };
                const newToken = genToken(payload, process.env.SECRETKEY);
                const oldToken = await Token.findOne({ where: { userId: user.id } });

                if (oldToken) {
                    await Token.update({ token: newToken }, { where: { userId: user.id } });
                    res.status(201).json({ message: "Login successful", newToken });
                }
                else {
                    res.status(400).json({ error: "No token found" });
                }
            } else {
                res.status(400).json({ error: "Invalid password" });
            }
        } else {
            res.status(400).json({ error: "User not found" });
        }
    } catch (error) {
        console.error(error.message);
        return;
    }
});