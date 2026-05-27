import { Request, Response, NextFunction } from "express";
import { getCommentsForVideo, addComment } from "../services/commentService";
import { successResponse, errorResponse } from "../utils/apiResponse";
import { getUserIdentity } from "../utils/helpers";

export const getComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { limit, page } = req.query as unknown as { limit?: number; page?: number };

    const comments = await getCommentsForVideo(String(id), limit || 10, page || 1);

    return successResponse(res, comments, "Comments loaded");
  } catch (error: any) {
    return errorResponse(res, error.message || "Failed to load comments", 500);
  }
};

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const { userId, userIp } = getUserIdentity(req);

    const comment = await addComment(String(id), text, userId, userIp);
    return successResponse(res, comment, "Comment added", 201);
  } catch (error: any) {
    return errorResponse(res, error.message || "Failed to add comment", 500);
  }
};
