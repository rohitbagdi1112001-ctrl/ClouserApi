import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import videoRoutes from "./routes/videoRoutes";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { notFoundMiddleware } from "./middleware/notFoundMiddleware";

dotenv.config();

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests, please try again later."
  }
});

app.use(limiter);
app.use(express.json());

app.use("/api/videos", videoRoutes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
