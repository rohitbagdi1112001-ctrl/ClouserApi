import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/apiResponse";

export const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return errorResponse(res, `Route not found: ${req.originalUrl}`, 404);
};
