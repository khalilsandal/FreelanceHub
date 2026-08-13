import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { loginUser } from "../../features/auth/authSlice";
import { getUserByEmail } from "../../services/userService";

const userSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const handleLogin = async (data) => {
    setError("");

    try {
      const user = await getUserByEmail(data.email);

      // User doesn't exist
      if (!user) {
        setError("Invalid email or password.");
        return;
      }

      // Password doesn't match
      if (user.password !== data.password) {
        setError("Invalid email or password.");
        return;
      }

      // Don't store password in Redux
      const { password: _, ...userWithoutPassword } = user;

      // Save authenticated user in Redux
      dispatch(loginUser(userWithoutPassword));

      // Redirect based on role
      if (user.role === "freelancer") {
        navigate("/app/jobs");
        return;
      }

      if (user.role === "client") {
        navigate("/app/freelancers");
        return;
      }

      // Fallback
      navigate("/app/dashboard");

    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Login Content */}
      <div className="flex min-h-screen items-center justify-center px-6 py-12">

        <div className="w-full max-w-md">

          {/* Logo / Brand */}
          <div className="mb-8 text-center">

            <Link
              to="/"
              className="text-3xl font-bold text-gray-900"
            >
              Freelance{" "}
              <span className="text-blue-600">
                Hub
              </span>
            </Link>

            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              Welcome back
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Sign in to continue to your account
            </p>

          </div>

          {/* Login Card */}
          <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200">

            {/* Social Login */}
            <div className="space-y-3">

              {/* Google */}
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <span className="text-lg font-bold text-red-500">
                  G
                </span>

                Continue with Google
              </button>

              {/* LinkedIn */}
              <button
                type="button"
                disabled
                className="flex w-full cursor-not-allowed items-center justify-center gap-3 rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 font-medium text-gray-400"
              >
                <span className="text-lg font-bold text-blue-700">
                  in
                </span>

                Continue with LinkedIn
              </button>

            </div>

            {/* Divider */}
            <div className="my-6 flex items-center">

              <div className="h-px flex-1 bg-gray-200" />

              <span className="px-4 text-sm text-gray-500">
                or continue with email
              </span>

              <div className="h-px flex-1 bg-gray-200" />

            </div>

            {/* Login Error */}
            {error && (
              <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Email / Password */}
            <form
              onSubmit={handleSubmit(handleLogin)}
              className="space-y-5"
            >

              {/* Email */}
              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className={`w-full rounded-lg border px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 ${
                    errors.email
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                />

                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}

              </div>

              {/* Password */}
              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    Forgot password?
                  </Link>

                </div>

                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className={`w-full rounded-lg border px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 ${
                    errors.password
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                />

                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}

              </div>

              {/* Remember Me */}
              <div className="flex items-center">

                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />

                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-600"
                >
                  Remember me
                </label>

              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>

            </form>

            {/* Register */}
            <p className="mt-6 text-center text-sm text-gray-600">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Create an account
              </Link>

            </p>

          </div>

          {/* Back Home */}
          <div className="mt-6 text-center">

            <Link
              to="/"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Back to Freelance Hub
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;