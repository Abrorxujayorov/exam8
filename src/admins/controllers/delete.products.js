import Product from "../../user/models/products.js";
import { Token } from "../../user/models/tokens.js";
import "dotenv/config.js"

import { verifyToken } from "../../utils/Token/token.helper.js";


export const deleteProduct = async (req, res) => {
    const token = req.headers['authorization'];
    const { id } = req.params;

    if (!token) {
        res.status(401).json({ error: "Enter token" });
        return;
    }

    const tokens = await Token.findOne({ where: { token } });
    if (!tokens) {
        res.status(401).json({ error: "Token not found" });
        return;
    }

    const decoded = verifyToken(token, process.env.SECRETKEY);
    const admin = decoded.isAdmin;
    if (!admin) {
        res.status(403).json({ error: "Only admins can delete products" });
        return;
    }

    try {
        const deletedProduct = await Product.destroy({ where: { id } });
        if (deletedProduct) {
            res.status(200).json({ success: true });
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};