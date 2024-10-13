import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bookRoutes from "../BACKEND/Routes/bookRoutes.js";
import userRouter from "../BACKEND/Routes/userRouter.js";

dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/user", userRouter);
app.use("/api/books", bookRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
