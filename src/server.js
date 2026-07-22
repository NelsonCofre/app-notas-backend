import express from "express";
import nodeRoutes from "./routes/nodeRoutes.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

app.use("/api/notes", nodeRoutes);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
});
