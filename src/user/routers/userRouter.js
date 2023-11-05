import { Router } from "express";
import { User } from "../models/user.models.js"
import { getpro, idpro } from "../components/products.get.js";
import { orders } from "../components/user.Order.js";

export const userRouter = Router();
export const productorder = Router()
productorder.get("/products/:id", idpro)
productorder.get("/products", getpro)
productorder.post("/products/order/:id", orders)




userRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const userid = await User.findOne({where: {id}})
        if (userid) {
            res.json({body: userid})
        } else {
            res.json({error: "User not found"})
        }
        return;
    } catch (error) {
       console.error(error.message);
    }
});


userRouter.get("/", async (req, res) => {
    try {
        const users = await User.findAll()
        if (users) {
            res.status(201).json({body: users})
            return;
        } else {
            res.status(403).json({error: "User not found"})
            return;
        }
    } catch (error) {
       console.error(error.message);
    }
});



// //PUT USER
userRouter.put('/:id', async (req, res) => {
    const { id } = req.params
    const { username, password } = req.body
    const userid = await User.findOne({where: {id}})
    if (username == null && password != null) {
        await User.update({password}, {where: {id}})
        res.json({message: "User updated PASSWORD"})
        return;
    }
    if (username != null && password == null) {
        await User.update({username}, {where: {id}})
        res.json({message: "User updated username"})
        return
    }
    if (username == null || password == null) {
        res.status(400).json({error: "Missing username or password"})
        return
    } 
    const update = username != null && password != null
    if (update) {
        await User.update({username, password}, {where: {id}})
        res.json({message: "User updated successfully"})
        return;
    } 
})

