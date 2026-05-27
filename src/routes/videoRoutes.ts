import express from "express";
import { validateRequest } from "../middleware/validateRequest";
import {
  videoListSchema,
  likeSchema,
  shareSchema,
  commentQuerySchema,
  commentBodySchema
} from "../schemas/videoSchemas";
import { getVideos, getVideoByIdController } from "../controllers/videoController";
import { likeVideo } from "../controllers/likeController";
import { shareVideo } from "../controllers/shareController";
import { getComments, createComment } from "../controllers/commentController";

const router = express.Router();

router.get("/", validateRequest(videoListSchema), getVideos);
router.get("/:id", getVideoByIdController);
router.post("/:id/like", validateRequest(likeSchema), likeVideo);
router.post("/:id/share", validateRequest(shareSchema), shareVideo);
router.get("/:id/comments", validateRequest(commentQuerySchema), getComments);
router.post("/:id/comments", validateRequest(commentBodySchema), createComment);

export default router;
