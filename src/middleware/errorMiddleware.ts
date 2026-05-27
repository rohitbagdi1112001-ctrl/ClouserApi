import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/apiResponse";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return errorResponse(res, message, statusCode);
};
