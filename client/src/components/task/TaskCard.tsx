import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, Clock3, Trash2 } from "lucide-react";

import type { Task, TaskStatus } from "../../features/task/taskTypes";

import { deleteTask, updateTask } from "../../features/task/taskApi";

import EditTask from "./EditTask";
import ConfirmDialog from "../common/ConfirmDialog";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      setIsConfirmOpen(false);
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
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-[#1d2029]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3
            className={`text-base font-semibold ${
              task.status === "completed"
                ? "text-slate-400 line-through"
                : "text-slate-800 dark:text-white"
            }`}
          >
            {task.title}
          </h3>

          {task.description && (
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              {task.description}
            </p>
          )}
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
            task.status === "completed"
              ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400"
          }`}
        >
          {task.status === "completed" ? "Completed" : "Pending"}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleStatusChange}
          disabled={statusMutation.isPending}
          className="flex items-center gap-1.5 rounded-lg bg-[#514bc4] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#433db0] disabled:opacity-50"
        >
          {task.status === "pending" ? (
            <>
              <Check className="h-4 w-4" />
              Mark Completed
            </>
          ) : (
            <>
              <Clock3 className="h-4 w-4" />
              Mark Pending
            </>
          )}
        </button>

        <EditTask task={task} />

        <button
          type="button"
          onClick={() => setIsConfirmOpen(true)}
          disabled={deleteMutation.isPending}
          className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-50 dark:bg-red-500/10 dark:text-red-400"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </button>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-700">
        <p className="text-xs text-slate-400">
          Created: {new Date(task.createdAt).toLocaleDateString()}
        </p>
      </div>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Delete this task?"
        message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        isLoading={deleteMutation.isPending}
        onConfirm={handleDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </div>
  );
};

export default TaskCard;
