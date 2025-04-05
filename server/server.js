import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import { connectDB } from "./config/db.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config();
const app = express();

// ✅ Enable CORS for all origins (Not recommended for production)
app.use(cors());
const PORT = process.env.PORT || 3000;
connectDB();
app.use(express.json());

app.use("/auth", userRoutes);
app.use("/user", authMiddleware, employeeRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
