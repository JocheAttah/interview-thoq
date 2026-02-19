import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import taskRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes";

// 1. Load Environment Variables
dotenv.config();

// 1.5 Connect to Database
connectDB();

// 2. Initialize App
const app: Express = express();
const port = process.env.PORT || 5001;

// 3. Middleware (The Gatekeepers)
app.use(cors()); // Allow Frontend to talk to us
app.use(express.json()); // Parse incoming JSON data

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/users", authRoutes);

// 4. Test Route (The "Hello World")
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server is running!");
});

// 5. Start Server
app
  .listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  })
  .on("error", (err) => {
    console.error("Server failed to start:", err);
  });
