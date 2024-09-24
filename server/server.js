import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import ProductRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT
app.use(express.json());
app.use("/api/products", ProductRoutes);
app.listen(PORT, () => {
  connectDb();
  console.log("server started at http://localhost:", PORT);
});
