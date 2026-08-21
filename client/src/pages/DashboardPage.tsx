import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks/redux";

import { logout } from "../features/auth/authSlice";

const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());

    navigate("/login");
  };

  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Task Dashboard</h1>

          <p className="mt-2">Welcome, {user?.name}</p>
        </div>

        <button
          onClick={handleLogout}
          className="rounded bg-red-600 px-4 py-2 text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
