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
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      {/* Title */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Title
        </label>

        <input
          type="text"
          placeholder="Enter task title"
          {...register("title")}
          className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#514bc4] focus:ring-2 focus:ring-[#514bc4]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />

        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Description
        </label>

        <textarea
          rows={4}
          placeholder="Enter task description"
          {...register("description")}
          className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#514bc4] focus:ring-2 focus:ring-[#514bc4]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
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
        className="h-12 w-full rounded-xl bg-gradient-to-r from-[#514bc4] to-[#6259d8] text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Please wait..." : submitText}
      </button>
    </form>
  );
};

export default TaskForm;
