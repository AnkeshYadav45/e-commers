import express, { json } from "express";
import { connect, Schema, model } from "mongoose";
import cors from "cors";
import router from "./routes/productRoutes.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
connect(`${process.env.MONGODB_URI}`)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));
app.use("/api", router);
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

