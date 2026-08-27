import { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import { submitProposal } from "../../services/proposalService";
import Loading from "../../components/common/Loading.jsx";
import ErrorState from "../../components/common/ErrorMessage/ErrorState";

const SubmitProposal = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [coverLetter, setCoverLetter] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [estimatedDuration, setEstimatedDuration] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Temporary logged-in freelancer
  // Later this can come from your authentication/user context
  const freelancerId = 1;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Validation
    if (!coverLetter.trim()) {
      setError("Please write a cover letter.");
      return;
    }

    if (!bidAmount || Number(bidAmount) <= 0) {
      setError("Please enter a valid bid amount.");
      return;
    }

    if (!estimatedDuration) {
      setError("Please select an estimated duration.");
      return;
    }

    try {
      setLoading(true);

      const proposal = await submitProposal({
        jobId: Number(jobId),
        freelancerId,
        coverLetter: coverLetter.trim(),
        bidAmount: Number(bidAmount),
        estimatedDuration,
      });

      console.log("Proposal submitted:", proposal);

      setSuccess("Your proposal has been submitted successfully!");

      // Clear form
      setCoverLetter("");
      setBidAmount("");
      setEstimatedDuration("");

      // Redirect after a short delay
      setTimeout(() => {
        navigate("/app/my-proposals");
      }, 1200);
    } catch (err) {
      setError("Failed to submit your proposal. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorState title="Something went wrong" message="We could not get load page" onRetry = {true} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-3xl">

        {/* Back */}
        <NavLink
          to={`/app/jobs/${jobId}`}
          className="mb-6 inline-flex items-center text-sm font-medium text-gray-600 hover:text-blue-600"
        >
          ← Back to Job
        </NavLink>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Submit a Proposal
          </h1>

          <p className="mt-2 text-gray-600">
            Tell the client why you're the right freelancer for this job.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-200"
        >

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {success}
            </div>
          )}

          {/* Cover Letter */}
          <div>
            <label
              htmlFor="coverLetter"
              className="block text-sm font-semibold text-gray-900"
            >
              Cover Letter
            </label>

            <p className="mt-1 text-sm text-gray-500">
              Explain your experience and why you're a good fit for this job.
            </p>

            <textarea
              id="coverLetter"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={8}
              placeholder="Tell the client about your experience, approach, and why you are the right person for this project..."
              className="mt-3 w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <div className="mt-1 text-right text-xs text-gray-400">
              {coverLetter.length} characters
            </div>
          </div>

          {/* Bid + Duration */}
          <div className="mt-7 grid gap-6 sm:grid-cols-2">

            {/* Bid */}
            <div>
              <label
                htmlFor="bidAmount"
                className="block text-sm font-semibold text-gray-900"
              >
                Your Bid
              </label>

              <p className="mt-1 text-sm text-gray-500">
                How much will you charge for this project?
              </p>

              <div className="relative mt-3">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>

                <input
                  id="bidAmount"
                  type="number"
                  min="1"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder="1200"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-8 pr-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Duration */}
            <div>
              <label
                htmlFor="estimatedDuration"
                className="block text-sm font-semibold text-gray-900"
              >
                Estimated Duration
              </label>

              <p className="mt-1 text-sm text-gray-500">
                How long will the project take?
              </p>

              <select
                id="estimatedDuration"
                value={estimatedDuration}
                onChange={(e) => setEstimatedDuration(e.target.value)}
                className="mt-3 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">
                  Select duration
                </option>

                <option value="Less than 1 week">
                  Less than 1 week
                </option>

                <option value="1 week">
                  1 week
                </option>

                <option value="2 weeks">
                  2 weeks
                </option>

                <option value="3 weeks">
                  3 weeks
                </option>

                <option value="1 month">
                  1 month
                </option>

                <option value="1 - 3 months">
                  1 - 3 months
                </option>

                <option value="3+ months">
                  3+ months
                </option>
              </select>
            </div>
          </div>

          {/* Divider */}
          <div className="my-8 border-t border-gray-100" />

          {/* Summary */}
          <div className="rounded-lg bg-gray-50 p-5">
            <h2 className="font-semibold text-gray-900">
              Proposal Summary
            </h2>

            <div className="mt-4 space-y-3">

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Your bid
                </span>

                <span className="font-semibold text-gray-900">
                  {bidAmount ? `$${bidAmount}` : "$0"}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Estimated duration
                </span>

                <span className="font-semibold text-gray-900">
                  {estimatedDuration || "Not selected"}
                </span>
              </div>

              <div className="flex justify-between border-t border-gray-200 pt-3 text-sm">
                <span className="font-medium text-gray-700">
                  Proposal status
                </span>

                <span className="font-semibold text-blue-600">
                  Pending
                </span>
              </div>

            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <NavLink
              to={`/app/jobs/${jobId}`}
              className="rounded-lg border border-gray-300 px-5 py-3 text-center font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </NavLink>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Proposal"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default SubmitProposal;