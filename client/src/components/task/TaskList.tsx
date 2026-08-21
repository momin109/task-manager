import type { Task } from "../../features/task/taskTypes";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
}

const TaskList = ({ tasks }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="rounded-xl border border-dashed bg-white p-10 text-center">
        <div className="text-4xl">📋</div>

        <h3 className="mt-4 text-lg font-semibold">No tasks found</h3>

        <p className="mt-2 text-sm text-gray-500">
          Create a new task to get started.
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
