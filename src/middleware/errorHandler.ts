import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      errors: err.errors || [],
    });
  }

  console.error(err);
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
}
