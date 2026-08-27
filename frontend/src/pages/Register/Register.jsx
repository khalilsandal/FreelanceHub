import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("freelancer");

  const handleRegister = (e) => {
    e.preventDefault();

    // Temporary registration for development
    localStorage.setItem("token", "demo-token");

    navigate("/app/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          {/* Brand */}
          <div className="mb-8 text-center">
            <Link
              to="/"
              className="text-3xl font-bold text-gray-900"
            >
              Freelance <span className="text-blue-600">Hub</span>
            </Link>

            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              Create your account
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Join Freelance Hub and get started today
            </p>
          </div>


          {/* Register Card */}
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
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 font-medium text-gray-400 cursor-not-allowed"
              >
                <span className="text-lg font-bold text-blue-700">
                  in
                </span>
                Continue with LinkedIn
              </button>

            </div>


            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="h-px flex-1 bg-gray-200"></div>

              <span className="px-4 text-sm text-gray-500">
                or register with email
              </span>

              <div className="h-px flex-1 bg-gray-200"></div>
            </div>


            {/* Form */}
            <form onSubmit={handleRegister} className="space-y-5">

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Full name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>


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
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>


              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength={8}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <p className="mt-1 text-xs text-gray-500">
                  Password must be at least 8 characters.
                </p>
              </div>


              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Confirm password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength={8}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>


              {/* Account Type */}
              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700">
                  I want to
                </label>

                <div className="grid grid-cols-2 gap-3">

                  {/* Freelancer */}
                  <button
                    type="button"
                    onClick={() => setRole("freelancer")}
                    className={`rounded-lg border p-4 text-left transition ${
                      role === "freelancer"
                        ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="font-semibold text-gray-900">
                      Find Work
                    </div>

                    <div className="mt-1 text-xs text-gray-500">
                      I'm a freelancer
                    </div>
                  </button>


                  {/* Employer */}
                  <button
                    type="button"
                    onClick={() => setRole("employer")}
                    className={`rounded-lg border p-4 text-left transition ${
                      role === "employer"
                        ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="font-semibold text-gray-900">
                      Hire Talent
                    </div>

                    <div className="mt-1 text-xs text-gray-500">
                      I'm an employer
                    </div>
                  </button>

                </div>
              </div>


              {/* Terms */}
              <div className="flex items-start">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />

                <label
                  htmlFor="terms"
                  className="ml-2 text-sm text-gray-600"
                >
                  I agree to the{" "}
                  <a
                    href="/terms"
                    className="font-medium text-blue-600 hover:text-blue-700"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy"
                    className="font-medium text-blue-600 hover:text-blue-700"
                  >
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>


              {/* Register */}
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Create account
              </button>

            </form>


            {/* Login */}
            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Sign in
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

export default Register;
