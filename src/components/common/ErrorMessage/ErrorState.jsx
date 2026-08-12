const ErrorState = ({
  title = "Something went wrong",
  message = "We couldn't load this page. Please try again.",
  onRetry,
}) => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-6">
      <div className="flex max-w-md flex-col items-center text-center">

        {/* Error Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
          <svg
            className="h-8 w-8 text-red-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v4m0 4h.01M10.29 3.86l-8.24 14a2 2 0 001.71 3h16.48a2 2 0 001.71-3l-8.24-14a2 2 0 00-3.42 0z"
            />
          </svg>
        </div>

        {/* Title */}
        <h2 className="mt-5 text-xl font-semibold text-gray-900">
          {title}
        </h2>

        {/* Message */}
        <p className="mt-2 text-sm leading-6 text-gray-500">
          {message}
        </p>

        {/* Retry Button */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Try Again
          </button>
        )}

      </div>
    </div>
  );
};

export default ErrorState;