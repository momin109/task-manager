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
        onClick={() => onChange("all")}
        className={`rounded px-4 py-2 text-sm font-medium ${
          status === "all"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        All
      </button>

      <button
        onClick={() => onChange("pending")}
        className={`rounded px-4 py-2 text-sm font-medium ${
          status === "pending"
            ? "bg-yellow-500 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        Pending
      </button>

      <button
        onClick={() => onChange("completed")}
        className={`rounded px-4 py-2 text-sm font-medium ${
          status === "completed"
            ? "bg-green-600 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        Completed
      </button>
    </div>
  );
};

export default TaskFilter;
