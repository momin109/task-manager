import api from "../../api/axios";
import type { Task, TaskStatus } from "./taskTypes";

export interface CreateTaskData {
  title: string;
  description?: string;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get("/tasks");

  return response.data.data.tasks;
};

export const createTask = async (data: CreateTaskData): Promise<Task> => {
  const response = await api.post("/tasks", data);

  return response.data.data;
};

export const updateTask = async ({
  id,
  data,
}: {
  id: string;
  data: UpdateTaskData;
}): Promise<Task> => {
  const response = await api.patch(`/tasks/${id}`, data);

  return response.data.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};
