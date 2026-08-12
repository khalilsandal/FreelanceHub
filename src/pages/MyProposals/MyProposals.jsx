import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import {
  getFreelancerProposals,
} from "../../services/proposalService";

import Loading from "../../components/common/loading";
import ErrorState from "../../components/common/ErrorMessage/ErrorState";

const MyProposals = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [statusFilter, setStatusFilter] = useState("All");

  // Temporary logged-in freelancer
  // Later this should come from your authentication context
  const freelancerId = 1;

  const loadProposals = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getFreelancerProposals(freelancerId);

      setProposals(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load proposals.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProposals();
  }, []);

  // Loading
  if (loading) {
    return <Loading />;
  }

  // Error
  if (error) {
    return (
      <ErrorState
        title="Something went wrong"
        message="We could not load your proposals."
        onRetry={loadProposals}
      />
    );
  }

  // Filter proposals
  const filteredProposals =
    statusFilter === "All"
      ? proposals
      : proposals.filter(
          (proposal) =>
            proposal.status?.toLowerCase() ===
            statusFilter.toLowerCase()
        );

  // Status styling
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "bg-green-50 text-green-700";

      case "rejected":
        return "bg-red-50 text-red-700";

      case "pending":
        return "bg-yellow-50 text-yellow-700";

      case "withdrawn":
        return "bg-gray-100 text-gray-600";

      default:
        return "bg-blue-50 text-blue-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Proposals
          </h1>

          <p className="mt-2 text-gray-600">
            Track and manage the proposals you have submitted.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Total */}
          <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
            <p className="text-sm text-gray-500">
              Total Proposals
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              {proposals.length}
            </p>
          </div>

          {/* Pending */}
          <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
            <p className="text-sm text-gray-500">
              Pending
            </p>

            <p className="mt-2 text-2xl font-bold text-yellow-600">
              {
                proposals.filter(
                  (proposal) =>
                    proposal.status?.toLowerCase() === "pending"
                ).length
              }
            </p>
          </div>

          {/* Accepted */}
          <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
            <p className="text-sm text-gray-500">
              Accepted
            </p>

            <p className="mt-2 text-2xl font-bold text-green-600">
              {
                proposals.filter(
                  (proposal) =>
                    proposal.status?.toLowerCase() === "accepted"
                ).length
              }
            </p>
          </div>

          {/* Rejected */}
          <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
            <p className="text-sm text-gray-500">
              Rejected
            </p>

            <p className="mt-2 text-2xl font-bold text-red-600">
              {
                proposals.filter(
                  (proposal) =>
                    proposal.status?.toLowerCase() === "rejected"
                ).length
              }
            </p>
          </div>

        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="font-semibold text-gray-900">
              Your Proposals
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {filteredProposals.length} proposals
            </p>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="All">
              All statuses
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Accepted">
              Accepted
            </option>

            <option value="Rejected">
              Rejected
            </option>

            <option value="Withdrawn">
              Withdrawn
            </option>
          </select>

        </div>

        {/* Empty State */}
        {filteredProposals.length === 0 && (
          <div className="rounded-xl bg-white p-12 text-center shadow-sm ring-1 ring-gray-200">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
              <span className="text-2xl">
                📄
              </span>
            </div>

            <h2 className="mt-5 text-xl font-semibold text-gray-900">
              No proposals found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              {statusFilter === "All"
                ? "You haven't submitted any proposals yet. Start applying to jobs to get started."
                : `You don't have any ${statusFilter.toLowerCase()} proposals.`}
            </p>

            <NavLink
              to="/app/jobs"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
            >
              Find Jobs
            </NavLink>

          </div>
        )}

        {/* Proposal List */}
        <div className="space-y-5">

          {filteredProposals.map((proposal) => (
            <div
              key={proposal.id}
              className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition hover:shadow-md"
            >

              {/* Top */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {proposal.jobTitle}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Proposal #{proposal.id}
                  </p>
                </div>

                {/* Status */}
                <span
                  className={`w-fit rounded-full px-3 py-1 text-sm font-semibold capitalize ${getStatusStyle(
                    proposal.status
                  )}`}
                >
                  {proposal.status}
                </span>

              </div>

              {/* Proposal info */}
              <div className="mt-6 grid gap-5 border-y border-gray-100 py-5 sm:grid-cols-3">

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Your Bid
                  </p>

                  <p className="mt-1 text-lg font-bold text-gray-900">
                    ${proposal.bidAmount}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Duration
                  </p>

                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {proposal.estimatedDuration}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Submitted
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {proposal.createdAt
                      ? new Date(
                          proposal.createdAt
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>

              </div>

              {/* Cover Letter */}
              <div className="mt-5">
                <p className="text-sm font-semibold text-gray-900">
                  Cover Letter
                </p>

                <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                  {proposal.coverLetter}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-6 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

                <span className="text-sm text-gray-500">
                  Job ID: {proposal.jobId}
                </span>

                <div className="flex gap-3">

                  <NavLink
                    to={`/app/my-proposals/${proposal.id}`}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                  >
                    View Proposal
                  </NavLink>

                  <NavLink
                    to={`/app/jobs/${proposal.jobId}`}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    View Job
                  </NavLink>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default MyProposals;