import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
        onClick={() => setIsOpen(true)}
        className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
      >
        + Add Task
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Add New Task</h2>

              <button
                onClick={() => setIsOpen(false)}
                className="text-xl text-gray-500"
              >
                ×
              </button>
            </div>

            <TaskForm
              onSubmit={handleSubmit}
              isPending={mutation.isPending}
              submitText="Create Task"
            />

            {mutation.isError && (
              <p className="mt-3 text-sm text-red-500">
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
