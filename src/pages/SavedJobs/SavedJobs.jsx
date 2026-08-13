import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Loading from "../../components/common/Loading";
import ErrorState from "../../components/common/ErrorMessage/ErrorState";
import { getJobs } from "../../services/jobService";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSavedJobs = async () => {
    try {
      setLoading(true);
      setError(null);

      const jobs = await getJobs();

      // Temporary saved jobs logic.
      // Later this can come from Redux/localStorage/backend.
      const savedJobIds = JSON.parse(
        localStorage.getItem("savedJobs") || "[]"
      );

      const filteredJobs = jobs.filter((job) =>
        savedJobIds.includes(job.id)
      );

      setSavedJobs(filteredJobs);
    } catch (err) {
      console.error(err);
      setError("Failed to load saved jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSavedJobs();
  }, []);

  const removeSavedJob = (jobId) => {
    const savedJobIds = JSON.parse(
      localStorage.getItem("savedJobs") || "[]"
    );

    const updatedIds = savedJobIds.filter(
      (id) => id !== jobId
    );

    localStorage.setItem(
      "savedJobs",
      JSON.stringify(updatedIds)
    );

    setSavedJobs((prev) =>
      prev.filter((job) => job.id !== jobId)
    );
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <ErrorState
        title="Something went wrong"
        message="We could not load your saved jobs."
        onRetry={loadSavedJobs}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">

      {/* Header */}
      <div className="mx-auto max-w-6xl">

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-900">
            Saved Jobs
          </h1>

          <p className="mt-2 text-gray-600">
            Keep track of jobs you're interested in.
          </p>

        </div>

        {/* Empty State */}
        {savedJobs.length === 0 ? (
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm ring-1 ring-gray-100">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl">
              ⭐
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              No saved jobs yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-gray-500">
              When you find a job that interests you, save it
              and come back to it later.
            </p>

            <NavLink
              to="/app/jobs"
              className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Browse Jobs
            </NavLink>

          </div>
        ) : (
          <div className="space-y-5">

            {/* Results count */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {savedJobs.length}{" "}
                {savedJobs.length === 1 ? "job" : "jobs"} saved
              </p>
            </div>

            {/* Jobs */}
            {savedJobs.map((job) => (
              <div
                key={job.id}
                className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition hover:shadow-md"
              >

                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                  {/* Job information */}
                  <div className="min-w-0">

                    <div className="flex flex-wrap items-center gap-2">

                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                        {job.category}
                      </span>

                      {job.type && (
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                          {job.type}
                        </span>
                      )}

                    </div>

                    <NavLink
                      to={`/app/jobs/${job.id}`}
                      className="mt-3 block text-xl font-bold text-gray-900 transition hover:text-blue-600"
                    >
                      {job.title}
                    </NavLink>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
                      {job.description}
                    </p>

                    {/* Skills */}
                    {job.skills && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {job.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                  </div>

                  {/* Right side */}
                  <div className="flex shrink-0 flex-col items-start sm:items-end">

                    {job.budget && (
                      <p className="text-lg font-bold text-gray-900">
                        {job.budget}
                      </p>
                    )}

                    {job.hourlyRate && (
                      <p className="text-lg font-bold text-gray-900">
                        {job.hourlyRate}
                      </p>
                    )}

                    <p className="mt-1 text-sm text-gray-500">
                      {job.location || "Remote"}
                    </p>

                  </div>

                </div>

                {/* Bottom */}
                <div className="mt-6 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex items-center gap-4 text-sm text-gray-500">

                    {job.postedAt && (
                      <span>
                        Posted {job.postedAt}
                      </span>
                    )}

                    {job.proposals !== undefined && (
                      <span>
                        {job.proposals} proposals
                      </span>
                    )}

                  </div>

                  <div className="flex gap-3">

                    <button
                      onClick={() => removeSavedJob(job.id)}
                      className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      Remove
                    </button>

                    <NavLink
                      to={`/app/jobs/${job.id}`}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      View Job
                    </NavLink>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default SavedJobs;