import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import AuthLayout from "../components/auth/AuthLayout";

import { loginSchema, type LoginFormData } from "../features/auth/authSchema";

import { loginUser } from "../features/auth/authApi";

import { setCredentials } from "../features/auth/authSlice";

import { useAppDispatch } from "../hooks/redux";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: loginUser,

    onSuccess: (response) => {
      const { user, token } = response.data;

      dispatch(
        setCredentials({
          user,
          token,
        }),
      );

      navigate("/");
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data);
  };

  const getErrorMessage = () => {
    if (!mutation.error) {
      return null;
    }

    if (axios.isAxiosError(mutation.error)) {
      return mutation.error.response?.data?.message || "Login failed";
    }

    return "Something went wrong";
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to continue managing your tasks"
      footer={
        <>
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-[#514bc4] hover:underline"
          >
            Create account
          </Link>
        </>
      }
    >
      {/* API Error */}
      {mutation.isError && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {getErrorMessage()}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-base font-medium text-slate-800"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#5b55d6] focus:ring-4 focus:ring-[#5b55d6]/10"
          />

          {errors.email && (
            <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-base font-medium text-slate-800"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
            className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#5b55d6] focus:ring-4 focus:ring-[#5b55d6]/10"
          />

          {errors.password && (
            <p className="mt-2 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={mutation.isPending}
          className="mt-2 h-14 w-full rounded-2xl bg-gradient-to-r from-[#514bc4] to-[#6259d8] text-base font-semibold text-white transition hover:opacity-95 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {mutation.isPending ? "Logging in..." : "Log in"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
