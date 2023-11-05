import "dotenv/config.js"
import Products from "../../user/models/products.js";
import { Token } from "../../user/models/tokens.js";
import { verifyToken } from "../../utils/Token/token.helper.js";



export const updateProducts = async (req, res) => {
    
    try {
        const { id } = req.params;
        const { title, count, price } = req.body;
        const token = req.headers['authorization'];
        
        if (title == null || count == null || price == null) {
            res.status(400).json({ error: "Missing count, title or price" });
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
        const admin = decoded.isAdmin;
        
        if (!admin) {
            res.status(403).json({ error: "Only admins can add products" });
            return;
        }
        
        const product = await Products.findOne({ where: { id } });

        if (!product) {
            res.status(404).json({ error: "Product not found" });
            return;
        }
        
        await product.update({ price, count: count + count });
        
        res.json({ success: "Updated successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};