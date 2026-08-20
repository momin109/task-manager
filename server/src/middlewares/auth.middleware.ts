import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { ApiError } from "../utils/ApiError.js";

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new ApiError("Authentication required.", 401);
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new ApiError("Authentication token is missing", 401);
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(token, secret);

    if (
      typeof decoded === "string" ||
      !decoded ||
      typeof decoded.userId !== "string"
    ) {
      throw new ApiError("Invalid authentication token", 401);
    }

    req.user = {
      userId: decoded.userId,
    };

    next();
  } catch (error) {
    if (error instanceof ApiError) {
      next(error);
      return;
    }

    next(new ApiError("Invalid or expired authentication token", 401));
  }
};
