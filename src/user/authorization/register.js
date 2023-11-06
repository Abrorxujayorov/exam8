import { Router } from "express";
import { User } from "../models/user.models.js";
import { passwordHash } from "../../utils/pass.hash.js";
import { passSalt } from "../../utils/pass.salt.js";
import { Token } from "../models/tokens.js";
import { genToken } from "../../utils/Token/token.helper.js";
import { adminsId } from "../../admins/adminId.js";

export const signup = Router();

signup.post("/signup", async (req, res) => {
  const { username, gmail, password } = req.body;
  try {
      const users = await User.findOne({ where: { username } });
      if (username == null || password == null || gmail == null) {
      res.status(400).json({ SUCCESS: "Error" });
      return;
    }
    if (users) {
      res.status(400).json({ ERROR: "This username is already taken" });
      return;
    }
    const hashed = passwordHash(password, passSalt);
    const newUser = await User.create({
      username,
      gmail,
      password: hashed,
      balance: 100000000,
    });
    const payload = {
      username: newUser.username,
      isAdmin: newUser.id == adminsId ? true : false,
    };
    const token = genToken(payload, process.env.SECRETKEY);
    await Token.create({
      token,
      userId: newUser.id,
    });
    return res.status(201).json({ SUCCESS: token });
  } catch (error) {
    console.error(error.message);
  }
});