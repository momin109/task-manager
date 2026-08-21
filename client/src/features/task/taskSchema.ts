import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, "Task title is required")
    .max(100, "Title cannot exceed 100 characters"),

  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
});

export type TaskFormData = z.infer<typeof taskSchema>;
