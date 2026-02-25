
import { connectDB } from "./lib/db";
import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());


app.get("/api", (req: Request, res: Response) => {
  res.send("Hello from TypeScript Express!");
});
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  connectDB();
});
