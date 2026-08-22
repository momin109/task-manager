import { ClipboardList } from "lucide-react";

import type { Task } from "../../features/task/taskTypes";

import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
}

const TaskList = ({ tasks }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center dark:border-slate-700 dark:bg-[#1d2029]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#eeeeff]">
          <ClipboardList className="h-7 w-7 text-[#514bc4]" />
        </div>

        <h3 className="mt-5 text-lg font-semibold text-slate-800 dark:text-white">
          No tasks yet
        </h3>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Add your first task to start tracking your work.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
