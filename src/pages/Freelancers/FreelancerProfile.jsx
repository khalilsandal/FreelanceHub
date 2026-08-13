import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import { getById } from "../../services/freelancerService";
import Loading from "../../components/common/Loading";
import ErrorState from "../../components/common/ErrorMessage/ErrorState";

const FreelancerProfile = () => {
  const { freelancerId } = useParams();
  const navigate = useNavigate();

  const [freelancer, setFreelancer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFreelancer = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getFreelancerById(freelancerId);

      setFreelancer(data);
    } catch (err) {
      setError("Failed to load freelancer profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFreelancer();
  }, [freelancerId]);

  if (loading) {
    return <Loading />;
  }

  if (error || !freelancer) {
    return (
      <ErrorState
        title="Freelancer not found"
        message="We could not find the freelancer you are looking for."
        onRetry={loadFreelancer}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Back */}
      <div className="mx-auto max-w-6xl px-6 pt-8">
        <button
          onClick={() => navigate("/app/freelancers")}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-blue-600"
        >
          <span>←</span>
          Back to Freelancers
        </button>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8">

        {/* Profile Header */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

          {/* Cover */}
          <div className="h-40 bg-gradient-to-r from-blue-600 to-blue-400" />

          <div className="px-6 pb-8 sm:px-8">

            {/* Profile picture */}
            <div className="-mt-16 flex flex-col sm:flex-row sm:items-end sm:justify-between">

              <div className="flex flex-col items-start sm:flex-row sm:items-end">

                <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-blue-100 text-4xl font-bold text-blue-600 shadow-md">
                  {freelancer.name?.charAt(0)}
                </div>

                <div className="mt-4 sm:ml-5 sm:mb-2">

                  <div className="flex flex-wrap items-center gap-3">

                    <h1 className="text-3xl font-bold text-gray-900">
                      {freelancer.name}
                    </h1>

                    {freelancer.availability === "Available now" && (
                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                        Available now
                      </span>
                    )}

                  </div>

                  <p className="mt-1 text-lg text-gray-600">
                    {freelancer.title}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    📍 {freelancer.location}
                  </p>

                </div>

              </div>

              {/* Contact button */}
              <div className="mt-6 flex gap-3 sm:mt-0">

                <button
                  className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                  onClick={() => {
                    // Later you can open a messaging page
                    alert("Messaging feature coming soon.");
                  }}
                >
                  Contact
                </button>

              </div>

            </div>

          </div>
        </div>

        {/* Main Content */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Left */}
          <div className="space-y-6 lg:col-span-2">

            {/* About */}
            <section className="rounded-xl bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-gray-900">
                About
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                {freelancer.description}
              </p>

            </section>

            {/* Skills */}
            <section className="rounded-xl bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-gray-900">
                Skills
              </h2>

              <div className="mt-5 flex flex-wrap gap-2">

                {freelancer.skills?.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600"
                  >
                    {skill}
                  </span>
                ))}

              </div>

            </section>

            {/* Experience */}
            <section className="rounded-xl bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-gray-900">
                Experience
              </h2>

              <div className="mt-6">

                <div className="border-l-2 border-blue-200 pl-5">

                  <div className="relative">

                    <div className="absolute -left-[27px] top-1 h-3 w-3 rounded-full bg-blue-600" />

                    <h3 className="font-semibold text-gray-900">
                      {freelancer.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Professional Freelancer
                    </p>

                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      Experienced professional with a strong track
                      record of delivering successful projects for
                      clients.
                    </p>

                  </div>

                </div>

              </div>

            </section>

            {/* Completed Jobs */}
            <section className="rounded-xl bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-gray-900">
                Work History
              </h2>

              <div className="mt-5 rounded-lg border border-gray-100 p-5">

                <div className="flex items-center justify-between">

                  <div>

                    <h3 className="font-semibold text-gray-900">
                      Completed freelance projects
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Successfully completed projects on the platform
                    </p>

                  </div>

                  <span className="text-2xl font-bold text-blue-600">
                    {freelancer.jobsCompleted}
                  </span>

                </div>

              </div>

            </section>

          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">

            {/* Rate */}
            <section className="rounded-xl bg-white p-6 shadow-sm">

              <p className="text-sm font-medium text-gray-500">
                Hourly Rate
              </p>

              <p className="mt-2 text-3xl font-bold text-gray-900">
                {freelancer.hourlyRate}
              </p>

              <button
                className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
                onClick={() => {
                  alert("Hiring feature coming soon.");
                }}
              >
                Hire {freelancer.name?.split(" ")[0]}
              </button>

            </section>

            {/* Rating */}
            <section className="rounded-xl bg-white p-6 shadow-sm">

              <p className="text-sm font-medium text-gray-500">
                Client Rating
              </p>

              <div className="mt-3 flex items-center gap-3">

                <span className="text-3xl font-bold text-gray-900">
                  {freelancer.rating}
                </span>

                <div>
                  <div className="text-lg text-yellow-400">
                    ★★★★★
                  </div>

                  <p className="text-sm text-gray-500">
                    {freelancer.reviews} reviews
                  </p>
                </div>

              </div>

            </section>

            {/* Stats */}
            <section className="rounded-xl bg-white p-6 shadow-sm">

              <h2 className="font-semibold text-gray-900">
                Statistics
              </h2>

              <div className="mt-5 space-y-4">

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Jobs completed
                  </span>

                  <span className="font-semibold text-gray-900">
                    {freelancer.jobsCompleted}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Reviews
                  </span>

                  <span className="font-semibold text-gray-900">
                    {freelancer.reviews}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Rating
                  </span>

                  <span className="font-semibold text-gray-900">
                    {freelancer.rating} / 5
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Availability
                  </span>

                  <span className="font-semibold text-green-600">
                    {freelancer.availability}
                  </span>
                </div>

              </div>

            </section>

            {/* Location */}
            <section className="rounded-xl bg-white p-6 shadow-sm">

              <h2 className="font-semibold text-gray-900">
                Location
              </h2>

              <p className="mt-3 text-gray-600">
                📍 {freelancer.location}
              </p>

            </section>

          </div>

        </div>

        {/* Bottom CTA */}
        <div className="mt-8 rounded-2xl bg-blue-600 px-6 py-10 text-center">

          <h2 className="text-2xl font-bold text-white">
            Interested in working with {freelancer.name}?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-blue-100">
            Contact this freelancer and discuss your project
            requirements.
          </p>

          <button
            onClick={() => {
              alert("Contact feature coming soon.");
            }}
            className="mt-6 rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-gray-100"
          >
            Contact Freelancer
          </button>

        </div>

      </div>
    </div>
  );
};

export default FreelancerProfile;