import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import discussionRoutes from "./routes/discussions.js";
import postRoutes from "./routes/posts.js";

dotenv.config();

const app = express();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/discussions", discussionRoutes);
app.use("/api/posts", postRoutes);

// Connect to MongoDB and start server
mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => console.error("MongoDB connection error:", error));
