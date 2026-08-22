import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { generateToken } from "../utils/jwt.js";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new ApiError("User already exists with this email", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // ✅ Token generate koro, login er moto
    const token = generateToken(user._id.toString());

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        token, // ✅ response e token add koro
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    // Find user and explicitly select password
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new ApiError("Invalid email or password", 401);
    }

    // Compare password
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new ApiError("Invalid email or password", 401);
    }

    // Generate JWT token
    const token = generateToken(user._id.toString());

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw new ApiError("User not authenticated", 401);
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
