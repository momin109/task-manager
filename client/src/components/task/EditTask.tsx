import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
        onClick={() => setIsOpen(true)}
        className="rounded bg-blue-100 px-3 py-1.5 text-sm text-blue-700 hover:bg-blue-200"
      >
        Edit
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Edit Task</h2>

              <button
                onClick={() => setIsOpen(false)}
                className="text-xl text-gray-500"
              >
                ×
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
              <p className="mt-3 text-sm text-red-500">
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
