import { Response } from "express";

export const successResponse = (
  res: Response,
  data: unknown = null,
  message = "",
  status = 200
) => {
  return res.status(status).json({
    success: true,
    message,
    data
  });
};

export const errorResponse = (
  res: Response,
  message = "Something went wrong",
  status = 500,
  data: unknown = null
) => {
  return res.status(status).json({
    success: false,
    message,
    data
  });
};
