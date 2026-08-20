import { Schema, model, Types } from "mongoose";

export type TaskStatus = "pending" | "completed";

export interface ITask {
  title: string;
  description: string;
  status: TaskStatus;
  userId: Types.ObjectId;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Task = model<ITask>("Task", taskSchema);
