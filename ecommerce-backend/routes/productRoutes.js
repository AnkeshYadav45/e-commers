import express from "express";
import Product from "../models/product.js"; 

const router = express.Router();

router.post("/products", async (req, res) => {
    try {
        const { name, price, img, details } = req.body;
        // 🔹 Validate required fields
        if (!name || !price || !img || !details) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // 🔹 Create a new product instance
        const newProduct = new Product({ name, price, img, details });

        // 🔹 Save product to MongoDB
        await newProduct.save();

        res.status(201).json({ message: "Product added successfully!", product: newProduct });
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ message: "Server error", error });
    }
});


router.get("/products", async (req, res) => {
    try {
        const name = req.query.name;
        if (!name) {
            return res.status(400).json({ message: "Product name is required" });
        }

        // 🔹 Case-insensitive search by name
        const product = await Product.find({ name: { $regex: new RegExp(name, "i") } });

        if (!product || product.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {  
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
});
router.get("/products/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
});


export default router;
