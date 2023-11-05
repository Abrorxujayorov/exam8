import Product from "../../user/models/products.js";
import { Token } from "../../user/models/tokens.js";
import "dotenv/config.js";
import { verifyToken } from "../../utils/Token/token.helper.js";
import { upload } from "../../utils/multer.con.js";

export const addProducts = async (req, res) => {
  try {
    const token = req.headers['authorization'];
    const { title, count, price } = req.body;
    if (title ==null || count==null || price==null ) {
      return res.status(400).json({ error: "Missing title, count, price, or pic" });
    }

    if (!token) {
      return res.status(401).json({ error: "Please provide a token" });
    }

    const tokens = await Token.findOne({ where: { token } });

    if (!tokens) {
      return res.status(401).json({ error: "Token not found" });
    }

    const decoded = verifyToken(token, process.env.SECRETKEY);
    const admin = decoded.isAdmin;

    if (!admin) {
      return res.status(403).json({ error: "Only admins can add products" });
    }

    const product = await Product.findOne({ where: { title } });

    if (product) {
      await product.update({ price, count: product.count + count });
      return res.json({ success: "Updated successfully" });
    } else {
      await Product.create({ title, count, price, file: req.body.filename });
      return res.json({ success: "Added successfully" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

