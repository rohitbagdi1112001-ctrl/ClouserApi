import express from "express";

import { likeVideo } from "../controllers/likeController";

const router = express.Router();

router.post("/", likeVideo);

export default router;