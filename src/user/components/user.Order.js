import { Router } from "express";
import { User } from "../models/user.models.js";
import { Token } from "../models/tokens.js";
import { verifyToken } from "../../utils/Token/token.helper.js";
import Products from "../models/products.js";
import Order from "../models/userOrders.js"

export const orders = async (req, res) => {
  const { id } = req.params;
  try {
    const { count } = req.body;
    const token = req.headers['authorization'];

    if (count == null) {
      res.status(400).json({ error: "Missing count" });
      return;
    }

    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const tokenData = await Token.findOne({ where: { token } });
    if (!tokenData) {
      res.status(401).json({ error: "Token not found" });
      return;
    }

    const decoded = verifyToken(token, process.env.SECRETKEY);
    const username = decoded.username;
    const UserBalance = await User.findOne({ where: { username } });
    const userId = UserBalance.id;
    const ProductPrice = await Products.findOne({where: { id }});
    const sum = ProductPrice.price * count;
    if (UserBalance.balance < sum) {
      res.status(201).json({ success: "low balance" });
      return;
    }

    const order = await Order.create({
      count: count,
      statuss: true,
      productId: id,
      userId: userId
    });
    res.json({ success: "Product added to cart successfully", order });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


