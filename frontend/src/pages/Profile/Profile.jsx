import React from "react";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getUserById } from "../../services/userService";
import Loading from "../../components/common/Loading.jsx";
import ErrorState from "../../components/common/ErrorMessage/ErrorState";

const Profile = () => {
  const { userId } = useParams();

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const data = await getUserById(userId);
        setUser(data);

      } catch (err) {
        setError("Failed to load job details.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorState title="Something went wrong" message="We could not get Job details" onRetry = {true} />;
  }
  // User not found
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">
              User not found
            </h1>

            <p className="mt-2 text-gray-600">
              The User you're looking for doesn't exist.
            </p>

            {/* <NavLink
              to="/app/jobs"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700"
            >
              ← Back to Home
            </NavLink> */}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">

      <div className="mx-auto max-w-5xl">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Profile
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your profile and personal information.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

          {/* Cover */}
          <div className="h-40 bg-gradient-to-r from-blue-500 to-blue-700">
          </div>

          {/* Profile Info */}
          <div className="px-6 pb-6">

            <div className="-mt-16 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

              {/* User */}
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">

                <img
                  src={user?.photoURL}
                  alt={user?.name}
                  className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-md"
                />

                <div className="pb-1">

                  <h2 className="text-2xl font-bold text-gray-900">
                    {user?.name}
                  </h2>

                  <p className="text-gray-500">
                    {user?.role}
                  </p>

                  <p className="mt-1 text-sm text-gray-400">
                    📍 {user?.location}
                  </p>

                </div>

              </div>

              {/* Edit button */}
              <NavLink
                to="/app/profile/edit"
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Edit Profile
              </NavLink>

            </div>

          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* Rating */}
          <div className="rounded-xl bg-white p-5 shadow-sm">

            <p className="text-sm text-gray-500">
              Rating
            </p>

            <div className="mt-2 flex items-center gap-2">

              <span className="text-2xl font-bold text-gray-900">
                {user?.rating}
              </span>

              <span className="text-yellow-400">
                ★
              </span>

            </div>

          </div>

          {/* Jobs */}
          <div className="rounded-xl bg-white p-5 shadow-sm">

            <p className="text-sm text-gray-500">
              Jobs Completed
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              {user?.jobsCompleted}
            </p>

          </div>

          {/* Hourly rate */}
          <div className="rounded-xl bg-white p-5 shadow-sm">

            <p className="text-sm text-gray-500">
              Hourly Rate
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              {user?.hourlyRate}
            </p>

          </div>

        </div>

        {/* Main Content */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* About */}
          <div className="rounded-xl bg-white p-6 shadow-sm lg:col-span-2">

            <h2 className="text-xl font-semibold text-gray-900">
              About Me
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              {user?.bio}
            </p>

          </div>

          {/* Account Info */}
          <div className="rounded-xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-semibold text-gray-900">
              Account
            </h2>

            <div className="mt-5 space-y-4">

              <div>
                <p className="text-xs font-medium uppercase text-gray-400">
                  Email
                </p>

                <p className="mt-1 break-all text-sm text-gray-700">
                  {user?.email}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-gray-400">
                  Location
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {user?.location}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-gray-400">
                  Member Since
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {user?.memberSince}
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Skills */}
        <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">

          <h2 className="text-xl font-semibold text-gray-900">
            Skills
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">

            {user?.skills?.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600"
              >
                {skill}
              </span>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;