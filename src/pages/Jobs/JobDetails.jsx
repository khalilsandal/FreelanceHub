import React from 'react'
import { getJobById } from "../../services/jobService";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loading from "../../components/common/loading";
import ErrorState from "../../components/common/ErrorMessage/ErrorState";

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadJob = async () => {
      try {
        setLoading(true);

        const data = await getJobById(jobId);

        setJob(data);
      } catch (err) {
        setError("Failed to load job details.");
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorState title="Something went wrong" message="We could not get Job details" onRetry = {true} />;
  }

  // Job not found
  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">
              Job not found
            </h1>

            <p className="mt-2 text-gray-600">
              The job you're looking for doesn't exist.
            </p>

            <NavLink
              to="/app/jobs"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700"
            >
              ← Back to Jobs
            </NavLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Back */}
        <NavLink
          to="/app/jobs"
          className="mb-6 inline-flex items-center text-sm font-medium text-gray-600 hover:text-blue-600"
        >
          ← Back to Jobs
        </NavLink>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Main Content */}
          <div className="lg:col-span-2">

            {/* Job Header */}
            <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-200">

              <div className="flex flex-col justify-between gap-6 sm:flex-row">
                <div>
                  <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                    {job.category}
                  </span>

                  <h1 className="mt-4 text-3xl font-bold text-gray-900">
                    {job.title}
                  </h1>

                  <div className="mt-3 flex flex-wrap gap-2 text-sm text-gray-500">
                    <span>{job.type}</span>
                    <span>•</span>
                    <span>Posted {job.posted}</span>
                    <span>•</span>
                    <span>{job.proposals} proposals</span>
                  </div>
                </div>

                <div className="shrink-0 sm:text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    {job.budget}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {job.type}
                  </p>
                </div>
              </div>

              <div className="my-8 h-px bg-gray-100" />

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Job Description
                </h2>

                <p className="mt-4 leading-7 text-gray-600">
                  {job.description}
                </p>

                <p className="mt-4 leading-7 text-gray-600">
                  We are looking for someone who can deliver high-quality
                  work and communicate clearly throughout the project.
                  Experience working on similar projects is preferred.
                </p>
              </div>

              {/* Skills */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900">
                  Skills Required
                </h2>

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skills?.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Additional Information */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900">
                  Project Information
                </h2>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">

                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">
                      Experience Level
                    </p>
                    <p className="mt-1 font-semibold text-gray-900">
                      {job.experience}
                    </p>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">
                      Project Duration
                    </p>
                    <p className="mt-1 font-semibold text-gray-900">
                      {job.duration}
                    </p>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">
                      Proposals
                    </p>
                    <p className="mt-1 font-semibold text-gray-900">
                      {job.proposals}
                    </p>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">
                      Job Type
                    </p>
                    <p className="mt-1 font-semibold text-gray-900">
                      {job.type}
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>


          {/* Right Sidebar */}
          <div className="space-y-6">

            {/* Apply Card */}
            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">

              <h2 className="text-lg font-semibold text-gray-900">
                Interested in this job?
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Submit a proposal and tell the client why you're the right
                person for this project.
              </p>

              
              <NavLink to={`/app/jobs/${job.id}/proposal`}
                className="mt-6 block w-full rounded-lg bg-blue-600 px-5 py-3 text-center font-semibold text-white hover:bg-blue-700"
>
  Submit a Proposal
</NavLink>

              <button
                className="mt-3 w-full rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Save Job
              </button>

            </div>


            {/* About Client */}
            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">

              <h2 className="text-lg font-semibold text-gray-900">
                About the Client
              </h2>

              <div className="mt-5 flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
                  {job.client?.name?.charAt(0)}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {job.client?.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {job.client?.location}
                  </p>
                </div>

              </div>

              <div className="mt-6 space-y-4 border-t border-gray-100 pt-5">

                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">
                    Jobs Posted
                  </span>

                  <span className="font-semibold text-gray-900">
                    {job.client?.jobsPosted}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">
                    Hire Rate
                  </span>

                  <span className="font-semibold text-gray-900">
                    {job.client?.hireRate}
                  </span>
                </div>

              </div>

            </div>


            {/* Report */}
            <div className="text-center">
              <button className="text-sm text-gray-500 hover:text-red-600">
                Report this job
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default JobDetails