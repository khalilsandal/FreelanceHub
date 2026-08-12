import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Temporary login for development
    localStorage.setItem("token", "demo-token");

    navigate("/app/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Login Content */}
      <div className="flex min-h-screen items-center justify-center px-6 py-12">

        <div className="w-full max-w-md">

          {/* Logo / Brand */}
          <div className="mb-8 text-center">
            <Link to="/" className="text-3xl font-bold text-gray-900">
              Freelance <span className="text-blue-600">Hub</span>
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


              {/* Facebook */}
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <span className="text-lg font-bold text-blue-600">
                  f
                </span>
                Continue with Facebook
              </button>


              {/* LinkedIn */}
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
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
                or continue with email
              </span>

              <div className="h-px flex-1 bg-gray-200"></div>
            </div>


            {/* Email / Password */}
            <form onSubmit={handleLogin} className="space-y-5">

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
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
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
                className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Sign in
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
