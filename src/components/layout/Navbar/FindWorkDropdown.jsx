import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

const FindWorkDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>

      {/* Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-blue-600"
      >
        Find Work

        <svg
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-200">

          <div className="border-b border-gray-100 px-4 py-3">
            <p className="text-sm font-semibold text-gray-900">
              Find Work
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Find your next freelance opportunity
            </p>
          </div>

          <div className="p-2">

            {/* Browse Jobs */}
            <NavLink
              to="/app/jobs"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-3 transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                💼
              </div>

              <div>
                <p className="text-sm font-medium">
                  Browse Jobs
                </p>

                <p className="text-xs text-gray-500">
                  Find available jobs
                </p>
              </div>
            </NavLink>

            {/* My Proposals */}
            <NavLink
              to="/app/my-proposals"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `mt-1 flex items-center gap-3 rounded-lg px-3 py-3 transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                📝
              </div>

              <div>
                <p className="text-sm font-medium">
                  My Proposals
                </p>

                <p className="text-xs text-gray-500">
                  Track your proposals
                </p>
              </div>
            </NavLink>

            {/* Saved Jobs */}
            <NavLink
              to="/app/jobs/saved-jobs"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `mt-1 flex items-center gap-3 rounded-lg px-3 py-3 transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                ⭐
              </div>

              <div>
                <p className="text-sm font-medium">
                  Saved Jobs
                </p>

                <p className="text-xs text-gray-500">
                  View your saved jobs
                </p>
              </div>
            </NavLink>

          </div>
        </div>
      )}
    </div>
  );
};

export default FindWorkDropdown;