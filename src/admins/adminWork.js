import { Router } from "express";
import { addProducts } from "./controllers/add.products.js"
import { updateProducts } from "./controllers/update.products.js";
import { deleteProduct } from "./controllers/delete.products.js";
import { upload } from "../utils/multer.con.js";

export const productRouter = Router()


productRouter.post("/products/add", upload.single('file') , addProducts);
productRouter.put("/products/update/:id", updateProducts);
productRouter.delete("/products/:id", deleteProduct);


