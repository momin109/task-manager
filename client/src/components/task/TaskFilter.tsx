import type { TaskStatus } from "../../features/task/taskTypes";

type FilterStatus = "all" | TaskStatus;

interface TaskFilterProps {
  status: FilterStatus;
  onChange: (status: FilterStatus) => void;
}

const TaskFilter = ({ status, onChange }: TaskFilterProps) => {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => onChange("all")}
        className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
          status === "all"
            ? "bg-[#514bc4] text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        }`}
      >
        All
      </button>

      <button
        type="button"
        onClick={() => onChange("pending")}
        className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
          status === "pending"
            ? "bg-[#d98a16] text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        }`}
      >
        Pending
      </button>

      <button
        type="button"
        onClick={() => onChange("completed")}
        className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
          status === "completed"
            ? "bg-[#2f9b63] text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        }`}
      >
        Completed
      </button>
    </div>
  );
};

export default TaskFilter;
