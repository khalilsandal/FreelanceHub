import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import HamburgerButton from "./HamburgerButton.jsx";
import Logofh from "../../../assets/logofh.png";

import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../features/auth/authSlice";
import FindWorkDropdown from "./FindWorkDropdown.jsx";


const Navbar = ({ setIsOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  // Temporary user
  // Replace this with Firebase user later
  // const user = {
  //   name: "John Smith",
  //   email: "john@example.com",
  //   role: "Freelancer",
  //   photoURL: "https://i.pravatar.cc/150?img=12",
  // };

  const handleLogout = () => {
    dispatch(logoutUser());

    setIsProfileOpen(false);
    navigate("/login");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white shadow">
        <div className="flex h-full items-center px-6">

          {/* Left side */}
          <div className="flex items-center gap-4">

            <HamburgerButton
              onClick={() =>
                setIsOpen((prevIsOpen) => !prevIsOpen)
              }
            />

            <NavLink
              to="/"
              className="flex items-center"
            >
              <img
                src={Logofh}
                alt="FreelanceHub"
                className="h-40 w-auto"
              />
            </NavLink>

          </div>

          


          {!isAuthenticated ? (
  <div className="ml-auto flex items-center gap-3">

    <NavLink
      to="/login"
      className="rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
    >
      Login
    </NavLink>

    <NavLink
      to="/register"
      className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
    >
      Register
    </NavLink>

  </div>
) : (
  <div className="ml-auto flex items-center gap-3">




   {/* Messages */}
      <NavLink
       to="/app/jobs/messages"
        className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-blue-600"
      >
        Messages      
      </NavLink>



    <FindWorkDropdown />
  <button
    onClick={() => setIsProfileOpen(true)}
    className="flex items-center gap-3 rounded-lg p-1.5 hover:bg-gray-100"
  >
    <img
      src={
        user?.photoURL ||
        "https://i.pravatar.cc/150"
      }
      alt={user?.name}
      className="h-10 w-10 rounded-full object-cover"
    />

    <div className="hidden text-left sm:block">
      <p className="text-sm font-semibold text-gray-900">
        {user?.name}
      </p>

      <p className="text-xs text-gray-500">
        {user?.role}
      </p>
    </div>
  </button></div>
)}

         
        </div>
      </nav>

      {/* Overlay */}
      {isProfileOpen && (
        <div
          onClick={() => setIsProfileOpen(false)}
          className="fixed inset-0 z-[55] bg-black/30"
        />
      )}

      {/* Right Sidebar */}
      <aside
        className={`fixed right-0 top-0 z-[60] h-screen w-80 bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isProfileOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">

          <h2 className="text-lg font-semibold text-gray-900">
            Account
          </h2>

          <button
            onClick={() => setIsProfileOpen(false)}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

        </div>

        {/* User information */}
        <div className="border-b px-6 py-6">

          <div className="flex items-center gap-4">

            <img
              src={user?.photoURL}
              alt={user?.name}
              className="h-14 w-14 rounded-full object-cover"
            />

            <div className="min-w-0">
              <h3 className="truncate font-semibold text-gray-900">
                {user?.name}
              </h3>

              <p className="truncate text-sm text-gray-500">
                {user?.email}
              </p>

              <p className="mt-1 text-xs font-semibold text-blue-600">
                {user?.role}
              </p>
            </div>

          </div>

        </div>

        {/* Menu */}
        <div className="p-4">

          <NavLink
            to={`/app/profile/${user?.id}`}
            onClick={() => setIsProfileOpen(false)}
            className="flex items-center gap-4 rounded-lg px-4 py-3 text-gray-700 transition hover:bg-gray-100"
          >
            <span className="text-lg">👤</span>
            <span>Profile</span>
          </NavLink>

          <NavLink
            to="/app/my-proposals"
            onClick={() => setIsProfileOpen(false)}
            className="flex items-center gap-4 rounded-lg px-4 py-3 text-gray-700 transition hover:bg-gray-100"
          >
            <span className="text-lg">📄</span>
            <span>My Proposals</span>
          </NavLink>

          <NavLink
            to="/app/settings"
            onClick={() => setIsProfileOpen(false)}
            className="flex items-center gap-4 rounded-lg px-4 py-3 text-gray-700 transition hover:bg-gray-100"
          >
            <span className="text-lg">⚙️</span>
            <span>Settings</span>
          </NavLink>

        </div>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 border-t p-4">

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-4 rounded-lg px-4 py-3 text-red-600 transition hover:bg-red-50"
          >
            <span className="text-lg">↪</span>

            <span className="font-medium">
              Logout
            </span>
          </button>
        </div>

      </aside>
    </>
  );
};

export default Navbar;