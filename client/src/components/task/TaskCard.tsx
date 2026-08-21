import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Task, TaskStatus } from "../../features/task/taskTypes";

import { deleteTask, updateTask } from "../../features/task/taskApi";

import EditTask from "./EditTask";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  const statusMutation = useMutation({
    mutationFn: updateTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) {
      return;
    }

    deleteMutation.mutate(task._id);
  };

  const handleStatusChange = () => {
    const newStatus: TaskStatus =
      task.status === "pending" ? "completed" : "pending";

    statusMutation.mutate({
      id: task._id,
      data: {
        status: newStatus,
      },
    });
  };

  return (
    <div className="rounded-lg border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3
            className={`text-lg font-semibold ${
              task.status === "completed" ? "text-gray-400 line-through" : ""
            }`}
          >
            {task.title}
          </h3>

          {task.description && (
            <p className="mt-2 text-sm text-gray-600">{task.description}</p>
          )}
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
            task.status === "completed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {task.status}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={handleStatusChange}
          disabled={statusMutation.isPending}
          className="rounded bg-green-600 px-3 py-1.5 text-sm text-white hover:bg-green-700 disabled:opacity-50"
        >
          {statusMutation.isPending
            ? "Updating..."
            : task.status === "pending"
              ? "Mark Completed"
              : "Mark Pending"}
        </button>

        <EditTask task={task} />

        <button
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
          className="rounded bg-red-100 px-3 py-1.5 text-sm text-red-700 hover:bg-red-200 disabled:opacity-50"
        >
          {deleteMutation.isPending ? "Deleting..." : "Delete"}
        </button>
      </div>

      <p className="mt-4 text-xs text-gray-400">
        Created: {new Date(task.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default TaskCard;
