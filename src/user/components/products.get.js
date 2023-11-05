import Products from "../models/products.js";

export const getpro =  async(req, res) => {
    try {
        const allproducts = await Products.findAll()
        if (allproducts) {
            return res.status(201).json({body: allproducts})
        } else {
            res.status(403).json({error: "User not found"})
            return;
        }
    } catch (error) {
       console.error(error.message);
    }
}

export const idpro =  async(req, res) => {
    const { id } = req.params
    try {
        const allproducts = await Products.findOne({where: {id}})
        if (allproducts) {
            return res.status(201).json({body: allproducts})
        } else {
            res.status(403).json({error: "ID not found"})
            return;
        }
    } catch (error) {
       console.error(error.message);
    }
}