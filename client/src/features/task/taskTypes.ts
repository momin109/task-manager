// export type TaskStatus = "pending" | "completed";

// export interface Task {
//   _id: string;
//   title: string;
//   description?: string;
//   status: TaskStatus;
//   userId: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface TasksResponse {
//   success: boolean;
//   message: string;
//   data: Task[];
// }

export type TaskStatus = "pending" | "completed";

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TasksResponse {
  success: boolean;
  message: string;
  data: {
    tasks: Task[];
  };
}
