import { ZodTypeAny } from "zod";
import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/apiResponse";

export const validateRequest = (schema: ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params
      });
      next();
    } catch (error: any) {
      const validationErrors = error.errors?.map((err: any) => ({ path: err.path, message: err.message })) || [];
      return errorResponse(res, "Invalid request data", 400, validationErrors);
    }
  };
};
