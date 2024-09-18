import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import Product from "./models/products.models.js";

dotenv.config();

const app = express();
app.use(express.json());
app.post("/api/products", async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "please provide all fields" });
  }
  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("error in create product", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
});

app.listen(5000, () => {
  connectDb();
  console.log("server started at http://localhost:5000");
});


