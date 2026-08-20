import type { Request, Response, NextFunction } from "express";
import { Task } from "../models/task.model.js";
import { ApiError } from "../utils/ApiError.js";

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw new ApiError("User not authenticated", 401);
    }

    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description,
      userId,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: {
        task,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw new ApiError("User not authenticated", 401);
    }

    const { status } = req.query;

    const filter: {
      userId: string;
      status?: "pending" | "completed";
    } = {
      userId,
    };

    if (status === "pending" || status === "completed") {
      filter.status = status;
    }

    const tasks = await Task.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: {
        tasks,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.userId;
    const { taskId } = req.params;

    if (!userId) {
      throw new ApiError("User not authenticated", 401);
    }

    const task = await Task.findOne({
      _id: taskId,
      userId,
    });

    if (!task) {
      throw new ApiError("Task not found", 404);
    }

    res.status(200).json({
      success: true,
      data: {
        task,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.userId;
    const { taskId } = req.params;

    if (!userId) {
      throw new ApiError("User not authenticated", 401);
    }

    const task = await Task.findOneAndUpdate(
      {
        _id: taskId,
        userId,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!task) {
      throw new ApiError("Task not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: {
        task,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.userId;
    const { taskId } = req.params;

    if (!userId) {
      throw new ApiError("User not authenticated", 401);
    }

    const task = await Task.findOneAndDelete({
      _id: taskId,
      userId,
    });

    if (!task) {
      throw new ApiError("Task not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
