import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { taskSchema, type TaskFormData } from "../../features/task/taskSchema";

interface TaskFormProps {
  defaultValues?: TaskFormData;
  onSubmit: (data: TaskFormData) => void;
  isPending?: boolean;
  submitText: string;
}

const TaskForm = ({
  defaultValues,
  onSubmit,
  isPending = false,
  submitText,
}: TaskFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      ...defaultValues,
    },
  });

  useEffect(() => {
    reset({
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
    });
  }, [defaultValues, reset]);

  const handleFormSubmit = (data: TaskFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Title</label>

        <input
          type="text"
          placeholder="Enter task title"
          {...register("title")}
          className="w-full rounded border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Description</label>

        <textarea
          rows={4}
          placeholder="Enter task description"
          {...register("description")}
          className="w-full resize-none rounded border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? "Please wait..." : submitText}
      </button>
    </form>
  );
};

export default TaskForm;
