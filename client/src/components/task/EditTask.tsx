import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil, X } from "lucide-react";

import type { Task } from "../../features/task/taskTypes";

import { updateTask } from "../../features/task/taskApi";

import type { TaskFormData } from "../../features/task/taskSchema";

import TaskForm from "./TaskForm";

interface EditTaskProps {
  task: Task;
}

const EditTask = ({ task }: EditTaskProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      setIsOpen(false);
    },
  });

  const handleSubmit = (data: TaskFormData) => {
    mutation.mutate({
      id: task._id,
      data,
    });
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400"
      >
        <Pencil className="h-4 w-4" />
        Edit
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#1d2029]">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                  Edit Task
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Update your task details.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <TaskForm
              defaultValues={{
                title: task.title,
                description: task.description || "",
              }}
              onSubmit={handleSubmit}
              isPending={mutation.isPending}
              submitText="Update Task"
            />

            {mutation.isError && (
              <p className="mt-4 text-sm text-red-500">
                Failed to update task.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditTask;
