import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  LayoutGrid,
  ListTodo,
  Moon,
  Search,
  Sun,
  TrendingUp,
  LogOut,
} from "lucide-react";

import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";

import AddTask from "../components/task/AddTask";
import TaskList from "../components/task/TaskList";

import { useTasks } from "../features/task/useTasks";

import type { TaskStatus } from "../features/task/taskTypes";

import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { toggleTheme } from "../features/theme/themeSlice";

type FilterStatus = "all" | TaskStatus;

const DashboardPage = () => {
  const [status, setStatus] = useState<FilterStatus>("all");
  const [search, setSearch] = useState("");

  const dispatch = useAppDispatch();

  const theme = useAppSelector((state) => state.theme.mode);

  const isDarkMode = theme === "dark";

  const { data: tasks = [], isLoading, isError, error, refetch } = useTasks();

  const user = useAppSelector((state) => state.auth.user);

  // Filter + Search Logic
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus = status === "all" ? true : task.status === status;

      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description?.toLowerCase().includes(search.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [tasks, status, search]);

  // Statistics
  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter((task) => task.status === "pending").length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed",
  ).length;

  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-[#111827] text-slate-100"
          : "bg-[#f6f7fb] text-slate-900"
      }`}
    >
      <div className="flex min-h-screen">
        {/* ================= Sidebar ================= */}

        <aside
          className={`fixed inset-y-0 left-0 z-30 hidden w-[270px] border-r lg:flex lg:flex-col ${
            isDarkMode
              ? "border-slate-800 bg-[#151c2b]"
              : "border-slate-200 bg-white"
          }`}
        >
          {/* Logo */}

          <div
            className={`flex h-[100px] items-center gap-3 border-b px-5 ${
              isDarkMode ? "border-slate-800" : "border-slate-200"
            }`}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#514bc4] to-[#6259d8] shadow-sm">
              <ListTodo size={22} className="text-white" />
            </div>

            <h1 className="text-[21px] font-semibold tracking-tight">
              TaskFlow
            </h1>
          </div>

          {/* Progress */}

          <div className="px-4 pt-6">
            <div
              className={`rounded-2xl border p-5 ${
                isDarkMode
                  ? "border-slate-800 bg-slate-900/50"
                  : "border-slate-200 bg-white shadow-sm"
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Circle */}

                <div className="relative flex h-[78px] w-[78px] shrink-0 items-center justify-center rounded-full border-[7px] border-[#dfe2ec]">
                  <span className="text-[16px] font-semibold">
                    {completionPercentage}%
                  </span>
                </div>

                <div>
                  <p className="text-[20px] font-semibold leading-none">
                    {completedTasks}/{totalTasks}
                  </p>

                  <p
                    className={`mt-2 text-[15px] ${
                      isDarkMode ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    tasks completed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}

          <nav className="mt-6 space-y-2 px-3">
            <button
              onClick={() => setStatus("all")}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[16px] font-medium transition ${
                status === "all"
                  ? isDarkMode
                    ? "bg-[#514bc4]/20 text-[#a9a5ff]"
                    : "bg-[#514bc4]/10 text-[#514bc4]"
                  : isDarkMode
                    ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                    : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <span className="flex items-center gap-3">
                <LayoutGrid size={20} />
                All tasks
              </span>

              <span
                className={`rounded-md px-2 py-0.5 text-[13px] ${
                  status === "all"
                    ? "bg-white/70 text-[#514bc4]"
                    : isDarkMode
                      ? "text-slate-400"
                      : "text-slate-500"
                }`}
              >
                {totalTasks}
              </span>
            </button>

            <button
              onClick={() => setStatus("pending")}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[16px] font-medium transition ${
                status === "pending"
                  ? isDarkMode
                    ? "bg-[#514bc4]/20 text-[#a9a5ff]"
                    : "bg-[#514bc4]/10 text-[#514bc4]"
                  : isDarkMode
                    ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                    : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <span className="flex items-center gap-3">
                <Clock3 size={20} />
                Pending
              </span>

              <span className="text-[13px]">{pendingTasks}</span>
            </button>

            <button
              onClick={() => setStatus("completed")}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[16px] font-medium transition ${
                status === "completed"
                  ? isDarkMode
                    ? "bg-[#514bc4]/20 text-[#a9a5ff]"
                    : "bg-[#514bc4]/10 text-[#514bc4]"
                  : isDarkMode
                    ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                    : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <span className="flex items-center gap-3">
                <CheckCircle2 size={20} />
                Completed
              </span>

              <span className="text-[13px]">{completedTasks}</span>
            </button>
          </nav>

          {/* User Bottom */}

          <div
            className={`mt-auto border-t p-4 ${
              isDarkMode ? "border-slate-800" : "border-slate-200"
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Avatar */}

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#514bc4]/10 text-[16px] font-semibold text-[#514bc4]">
                {user?.name
                  ?.split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase() || "U"}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-semibold">
                  {user?.name || "User"}
                </p>

                <p
                  className={`truncate text-[13px] ${
                    isDarkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {user?.email || ""}
                </p>
              </div>

              <button
                onClick={() => dispatch(toggleTheme())}
                className={`rounded-lg p-2 transition ${
                  isDarkMode
                    ? "text-yellow-400 hover:bg-slate-800"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
                title="Toggle theme"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button
                className={`rounded-lg p-2 transition ${
                  isDarkMode
                    ? "text-slate-400 hover:bg-slate-800 hover:text-red-400"
                    : "text-slate-500 hover:bg-slate-100 hover:text-red-500"
                }`}
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </aside>

        {/* ================= Main Area ================= */}

        <div className="min-w-0 flex-1 lg:ml-[270px]">
          {/* Top Header */}

          <header
            className={`sticky top-0 z-20 flex h-[100px] items-center border-b px-5 lg:px-9 ${
              isDarkMode
                ? "border-slate-800 bg-[#151c2b]"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex w-full items-center gap-5">
              <h2 className="hidden shrink-0 text-[21px] font-semibold sm:block">
                {status === "all"
                  ? "All tasks"
                  : status === "pending"
                    ? "Pending"
                    : "Completed"}
              </h2>

              {/* Search */}

              <div className="relative w-full max-w-[450px]">
                <Search
                  size={21}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                    isDarkMode ? "text-slate-500" : "text-slate-400"
                  }`}
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search tasks..."
                  className={`h-[54px] w-full rounded-xl border pl-12 pr-4 text-[16px] outline-none transition ${
                    isDarkMode
                      ? "border-slate-700 bg-slate-900 text-white placeholder:text-slate-500 focus:border-[#6259d8]"
                      : "border-slate-200 bg-[#fafafa] text-slate-800 placeholder:text-slate-400 focus:border-[#6259d8] focus:ring-4 focus:ring-[#6259d8]/10"
                  }`}
                />
              </div>

              {/* Add Task */}

              <div className="ml-auto">
                <AddTask />
              </div>
            </div>
          </header>

          {/* Content */}

          <main className="mx-auto max-w-[1400px] px-5 py-8 lg:px-10">
            {/* Mobile Filter */}

            <div className="mb-6 flex gap-2 overflow-x-auto lg:hidden">
              <button
                onClick={() => setStatus("all")}
                className={`rounded-lg px-4 py-2 text-sm font-medium ${
                  status === "all"
                    ? "bg-[#514bc4] text-white"
                    : isDarkMode
                      ? "bg-slate-800 text-slate-300"
                      : "bg-white text-slate-600"
                }`}
              >
                All ({totalTasks})
              </button>

              <button
                onClick={() => setStatus("pending")}
                className={`rounded-lg px-4 py-2 text-sm font-medium ${
                  status === "pending"
                    ? "bg-[#514bc4] text-white"
                    : isDarkMode
                      ? "bg-slate-800 text-slate-300"
                      : "bg-white text-slate-600"
                }`}
              >
                Pending ({pendingTasks})
              </button>

              <button
                onClick={() => setStatus("completed")}
                className={`rounded-lg px-4 py-2 text-sm font-medium ${
                  status === "completed"
                    ? "bg-[#514bc4] text-white"
                    : isDarkMode
                      ? "bg-slate-800 text-slate-300"
                      : "bg-white text-slate-600"
                }`}
              >
                Completed ({completedTasks})
              </button>
            </div>

            {/* ================= Stats ================= */}

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {/* Total */}

              <StatCard
                icon={<ListTodo size={21} />}
                value={totalTasks}
                label="Total tasks"
                isDarkMode={isDarkMode}
                iconClass="bg-[#514bc4]/10 text-[#514bc4]"
              />

              {/* Pending */}

              <StatCard
                icon={<Clock3 size={21} />}
                value={pendingTasks}
                label="Pending"
                isDarkMode={isDarkMode}
                iconClass="bg-orange-500/10 text-orange-500"
              />

              {/* Completed */}

              <StatCard
                icon={<CheckCircle2 size={21} />}
                value={completedTasks}
                label="Completed"
                isDarkMode={isDarkMode}
                iconClass="bg-green-500/10 text-green-600"
              />

              {/* Progress */}

              <StatCard
                icon={<TrendingUp size={21} />}
                value={`${completionPercentage}%`}
                label="Completion rate"
                isDarkMode={isDarkMode}
                iconClass="bg-red-500/10 text-red-500"
              />
            </div>

            {/* ================= Loading ================= */}

            <div className="mt-7">
              {isLoading && <Loader text="Loading your tasks..." />}

              {isError && (
                <ErrorMessage
                  message={
                    error instanceof Error
                      ? error.message
                      : "Failed to load tasks"
                  }
                  onRetry={() => refetch()}
                />
              )}

              {/* ================= Task List ================= */}

              {!isLoading && !isError && <TaskList tasks={filteredTasks} />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  value: number | string;
  label: string;
  iconClass: string;
  isDarkMode: boolean;
}

const StatCard = ({
  icon,
  value,
  label,
  iconClass,
  isDarkMode,
}: StatCardProps) => {
  return (
    <div
      className={`rounded-2xl border p-6 transition ${
        isDarkMode
          ? "border-slate-800 bg-[#151c2b]"
          : "border-slate-200 bg-white shadow-sm"
      }`}
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
      >
        {icon}
      </div>

      <p className="mt-4 text-[32px] font-semibold leading-none">{value}</p>

      <p
        className={`mt-2 text-[16px] ${
          isDarkMode ? "text-slate-400" : "text-slate-500"
        }`}
      >
        {label}
      </p>
    </div>
  );
};

export default DashboardPage;
