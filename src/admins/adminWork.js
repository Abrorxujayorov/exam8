import { Router } from "express";
import { addProducts } from "./controllers/add.products.js"
import { updateProducts } from "./controllers/update.products.js";
import { deleteProduct } from "./controllers/delete.products.js";

export const productRouter = Router()


// //ADD products
productRouter.post("/products/add", addProducts);
productRouter.put("/products/update/:id", updateProducts);
productRouter.delete("/products/:id", deleteProduct);


