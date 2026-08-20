import express from "express";
import type { Request, Response } from "express";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";

import { notFound } from "./middlewares/notFound.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.get("/api/v1/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully",
  });
});

// Auth routes
app.use("/api/v1/auth", authRoutes);

/*
  সব routes-এর পরে এগুলো থাকবে।
*/

app.use(notFound);

app.use(errorHandler);

export default app;
