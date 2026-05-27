import { Request, Response, NextFunction } from "express";
import { toggleLike } from "../services/likeService";
import { successResponse, errorResponse } from "../utils/apiResponse";
import { getUserIdentity } from "../utils/helpers";

export const likeVideo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { userId, userIp } = getUserIdentity(req);

    const result = await toggleLike(String(id), userId, userIp);

    return successResponse(
      res,
      result,
      result.liked ? "Video liked" : "Video unliked"
    );
  } catch (error: any) {
    return errorResponse(res, error.message || "Failed to toggle like", 500);
  }
};
