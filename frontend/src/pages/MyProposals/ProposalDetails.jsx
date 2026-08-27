import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import { getProposalById } from "../../services/proposalService";

import Loading from "../../components/common/Loading.jsx";
import ErrorState from "../../components/common/ErrorMessage/ErrorState";

const ProposalDetails = () => {
  const { proposalId } = useParams();
  const navigate = useNavigate();

  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProposal = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getProposalById(proposalId);

      if (!data) {
        setError("Proposal not found.");
        return;
      }

      setProposal(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load proposal.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProposal();
  }, [proposalId]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <ErrorState
        title="Something went wrong"
        message={error}
        onRetry={loadProposal}
      />
    );
  }

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
      <div className="mx-auto max-w-4xl">

        {/* Back */}
        <NavLink
          to="/app/my-proposals"
          className="mb-6 inline-flex items-center text-sm font-medium text-gray-600 transition hover:text-blue-600"
        >
          ← Back to My Proposals
        </NavLink>

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 sm:flex-row sm:items-start sm:justify-between">

          <div>
            <p className="text-sm font-medium text-blue-600">
              Proposal #{proposal.id}
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              {proposal.jobTitle}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Submitted{" "}
              {proposal.createdAt
                ? new Date(proposal.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          <span
            className={`w-fit rounded-full px-4 py-2 text-sm font-semibold capitalize ${getStatusStyle(
              proposal.status
            )}`}
          >
            {proposal.status}
          </span>

        </div>

        {/* Proposal Summary */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">

          <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
            <p className="text-sm text-gray-500">
              Your Bid
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              ${proposal.bidAmount}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
            <p className="text-sm text-gray-500">
              Estimated Duration
            </p>

            <p className="mt-2 text-lg font-bold text-gray-900">
              {proposal.estimatedDuration}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
            <p className="text-sm text-gray-500">
              Status
            </p>

            <p className="mt-2 font-bold capitalize text-gray-900">
              {proposal.status}
            </p>
          </div>

        </div>

        {/* Cover Letter */}
        <div className="mb-6 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">

          <h2 className="text-xl font-semibold text-gray-900">
            Your Cover Letter
          </h2>

          <div className="mt-4 rounded-lg bg-gray-50 p-5">
            <p className="whitespace-pre-line text-sm leading-7 text-gray-700">
              {proposal.coverLetter}
            </p>
          </div>

        </div>

        {/* Job Information */}
        <div className="mb-6 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">

          <h2 className="text-xl font-semibold text-gray-900">
            Job Information
          </h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Job ID
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                #{proposal.jobId}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Proposal ID
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                #{proposal.id}
              </p>
            </div>

          </div>

        </div>

        {/* Status Message */}
        {proposal.status?.toLowerCase() === "pending" && (
          <div className="mb-6 rounded-xl border border-yellow-200 bg-yellow-50 p-5">

            <div className="flex gap-3">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-100">
                ⏳
              </div>

              <div>
                <h3 className="font-semibold text-yellow-900">
                  Proposal under review
                </h3>

                <p className="mt-1 text-sm leading-6 text-yellow-800">
                  The client has not made a decision yet. You will be
                  notified when the proposal status changes.
                </p>
              </div>

            </div>

          </div>
        )}

        {proposal.status?.toLowerCase() === "accepted" && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-5">

            <div className="flex gap-3">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
                ✓
              </div>

              <div>
                <h3 className="font-semibold text-green-900">
                  Congratulations!
                </h3>

                <p className="mt-1 text-sm leading-6 text-green-800">
                  Your proposal has been accepted by the client.
                  You can now proceed with the project.
                </p>
              </div>

            </div>

          </div>
        )}

        {proposal.status?.toLowerCase() === "rejected" && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-5">

            <div className="flex gap-3">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100">
                !
              </div>

              <div>
                <h3 className="font-semibold text-red-900">
                  Proposal not selected
                </h3>

                <p className="mt-1 text-sm leading-6 text-red-800">
                  The client decided not to move forward with this
                  proposal. Keep applying to other opportunities.
                </p>
              </div>

            </div>

          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">

          <NavLink
            to="/app/my-proposals"
            className="rounded-lg border border-gray-300 px-5 py-3 text-center font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Back to Proposals
          </NavLink>

          <NavLink
            to={`/app/jobs/${proposal.jobId}`}
            className="rounded-lg bg-blue-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
          >
            View Job
          </NavLink>

        </div>

      </div>
    </div>
  );
};

export default ProposalDetails;