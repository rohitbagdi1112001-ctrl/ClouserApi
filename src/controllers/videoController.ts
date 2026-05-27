import { Request, Response, NextFunction } from "express";
import { getVideoFeed, getVideoById } from "../services/videoService";
import { successResponse, errorResponse } from "../utils/apiResponse";

export const getVideos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit = Number(req.query.limit || 10);
    const page = Number(req.query.page || 1);
    const cursor = req.query.cursor as string | undefined;

    const feed = await getVideoFeed(limit, page, cursor);

    return successResponse(res, feed, "Videos loaded");
  } catch (error: any) {
    return errorResponse(res, error.message || "Failed to fetch videos", 500);
  }
};

export const getVideoByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const video = await getVideoById(String(id));

    if (!video) {
      return errorResponse(res, "Video not found", 404);
    }

    return successResponse(res, video, "Video details loaded");
  } catch (error: any) {
    return errorResponse(res, error.message || "Failed to load video details", 500);
  }
};
