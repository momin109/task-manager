import { useState } from "react";

import Navbar from "../components/layout/Navbar";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";

import AddTask from "../components/task/AddTask";
import TaskFilter from "../components/task/TaskFilter";
import TaskList from "../components/task/TaskList";

import { useTasks } from "../features/task/useTasks";

import type { TaskStatus } from "../features/task/taskTypes";

type FilterStatus = "all" | TaskStatus;

const DashboardPage = () => {
  const [status, setStatus] = useState<FilterStatus>("all");

  const { data: tasks = [], isLoading, isError, error, refetch } = useTasks();
  console.log("tasks:", tasks);
  console.log("isArray:", Array.isArray(tasks));

  const filteredTasks = tasks.filter((task) => {
    if (status === "all") {
      return true;
    }

    return task.status === status;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              My Tasks
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage all your tasks in one place.
            </p>
          </div>

          <AddTask />
        </div>

        <div className="mb-6 overflow-x-auto">
          <TaskFilter status={status} onChange={setStatus} />
        </div>

        {isLoading && <Loader text="Loading your tasks..." />}

        {isError && (
          <ErrorMessage
            message={
              error instanceof Error ? error.message : "Failed to load tasks"
            }
            onRetry={() => refetch()}
          />
        )}

        {!isLoading && !isError && <TaskList tasks={filteredTasks} />}
      </main>
    </div>
  );
};

export default DashboardPage;
