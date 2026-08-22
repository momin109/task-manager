import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, X } from "lucide-react";

import TaskForm from "./TaskForm";

import { createTask } from "../../features/task/taskApi";

import type { TaskFormData } from "../../features/task/taskSchema";

const AddTask = () => {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      setIsOpen(false);
    },
  });

  const handleSubmit = (data: TaskFormData) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#514bc4] to-[#6259d8] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95"
      >
        <Plus className="h-5 w-5" />
        Add task
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#1d2029]">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                  Add New Task
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Create a new task to track your work.
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
              onSubmit={handleSubmit}
              isPending={mutation.isPending}
              submitText="Create Task"
            />

            {mutation.isError && (
              <p className="mt-4 text-sm text-red-500">
                Failed to create task.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTask;
