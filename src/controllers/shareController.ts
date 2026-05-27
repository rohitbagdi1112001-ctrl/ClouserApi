import { Request, Response, NextFunction } from "express";
import { createShare } from "../services/shareService";
import { successResponse, errorResponse } from "../utils/apiResponse";
import { getUserIdentity } from "../utils/helpers";

export const shareVideo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { platform } = req.body;
    const { userId, userIp } = getUserIdentity(req);

    const result = await createShare(String(id), platform, userId, userIp);
    return successResponse(res, result, `Shared on ${platform}`);
  } catch (error: any) {
    return errorResponse(res, error.message || "Failed to track share", 500);
  }
};
