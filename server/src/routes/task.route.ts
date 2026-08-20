import { Router } from "express";

import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

import {
  createTaskSchema,
  updateTaskSchema,
} from "../validations/task.validation.js";

const router = Router();

router.use(authenticate);

router.post("/", validate(createTaskSchema), createTask);

router.get("/", getTasks);

router.get("/:taskId", getTaskById);

router.patch("/:taskId", validate(updateTaskSchema), updateTask);

router.delete("/:taskId", deleteTask);

export default router;
