import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getJobs } from "../../services/jobService";
import Loading from "../../components/common/Loading.jsx";
import ErrorState from "../../components/common/ErrorMessage/ErrorState";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);

        const data = await getJobs();

        setJobs(data);
      } catch (err) {
        setError("Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorState title="Something went wrong" message="We could not get Jobs" onRetry = {true} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Find Jobs
          </h1>

          <p className="mt-2 text-gray-600">
            Find freelance projects that match your skills and experience.
          </p>
        </div>


        {/* Search & Filters */}
        <div className="mb-8 rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
          <div className="grid gap-4 md:grid-cols-4">

            {/* Search */}
            <div className="md:col-span-2">
              <label
                htmlFor="search"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Search jobs
              </label>

              <input
                id="search"
                type="text"
                placeholder="Search by title, skill or keyword..."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>


            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Category
              </label>

              <select
                id="category"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option>All categories</option>
                <option>Web Development</option>
                <option>Design</option>
                <option>Writing</option>
                <option>Marketing</option>
                <option>Business</option>
              </select>
            </div>


            {/* Job Type */}
            <div>
              <label
                htmlFor="type"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Job type
              </label>

              <select
                id="type"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option>All types</option>
                <option>Fixed Price</option>
                <option>Hourly</option>
              </select>
            </div>

          </div>
        </div>


        {/* Results Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Available Jobs
          </h2>

          <span className="text-sm text-gray-500">
            {jobs.length} jobs found
          </span>
        </div>


        {/* Jobs */}
        <div className="space-y-5">

          {jobs.map((job) => (
            <div
              key={job.id}
              className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition hover:-translate-y-0.5 hover:shadow-md"
            >

              {/* Job Header */}
              <div className="flex flex-col justify-between gap-4 md:flex-row">

                <div>
                  <NavLink
                    to={`/app/jobs/${job.id}`}
                    className="text-xl font-semibold text-gray-900 hover:text-blue-600"
                  >
                    {job.title}
                  </NavLink>

                  <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                    <span>{job.category}</span>
                    <span>•</span>
                    <span>{job.type}</span>
                    <span>•</span>
                    <span>{job.posted}</span>
                  </div>
                </div>


                {/* Budget */}
                <div className="shrink-0">
                  <p className="text-lg font-bold text-gray-900">
                    {job.budget}
                  </p>

                  <p className="text-right text-sm text-gray-500">
                    Budget
                  </p>
                </div>

              </div>


              {/* Description */}
              <p className="mt-4 max-w-4xl text-gray-600">
                {job.description}
              </p>


              {/* Skills */}
              <div className="mt-5 flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>


              {/* Footer */}
              <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-gray-100 pt-5 sm:flex-row sm:items-center">

                <div className="text-sm text-gray-500">
                  <span>
                    {job.proposals} proposals
                  </span>
                </div>


                <NavLink
                  to={`/app/jobs/${job.id}`}
                  className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
                >
                  View Details
                </NavLink>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default Jobs;
