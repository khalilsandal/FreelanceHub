import { NavLink, useNavigate, useParams } from "react-router-dom";

import { submitProposal } from "../../services/proposalService";
import { getJobById } from "../../services/jobService";

import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const proposalSchema = z.object({
  coverLetter: z
    .string()
    .min(5, "Cover Letter must be at least 5 characters"),

  bidAmount: z
    .number({
      invalid_type_error: "Bid Amount must be a number",
    })
    .positive("Bid Amount must be greater than 0"),

  estimatedDuration: z
    .string()
    .min(1, "Please enter Estimated Duration"),
});

const SubmitProposal = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.user);


  

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(proposalSchema),

    defaultValues: {
      coverLetter: "",
      bidAmount: "",
      estimatedDuration: "",
    },
  });

  

  // Temporary logged-in freelancer
  // Later this should come from authentication/context
  const freelancerId = currentUser.id;

  // Watch values for the summary
  const bidAmount = watch("bidAmount");
  const estimatedDuration = watch("estimatedDuration");

  const onSubmit = async (data) => {
    try {
      const jobTitleValue = await getJobById(jobId);
      const proposal = {
        ...data,
        jobId: Number(jobId),
        freelancerId,
        jobTitle: jobTitleValue.title
      };

      console.log("proposal data:", proposal);

      await submitProposal(proposal);

      console.log("proposal created successfully!");

      reset();

      // Go back to the job after successful submission
      navigate(`/app/jobs/${jobId}`);
    } catch (error) {
      console.error("Failed to submit proposal:", error);
    }
  };

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
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-200"
        >

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
              {...register("coverLetter")}
              rows={8}
              placeholder="Tell the client about your experience, approach, and why you are the right person for this project..."
              className={`mt-3 w-full resize-none rounded-lg border px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 ${
                errors.coverLetter
                  ? "border-red-500 focus:ring-red-100"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
              }`}
            />

            {errors.coverLetter && (
              <p className="mt-1 text-sm text-red-600">
                {errors.coverLetter.message}
              </p>
            )}
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
                  {...register("bidAmount", {
                    valueAsNumber: true,
                  })}
                  placeholder="1200"
                  className={`w-full rounded-lg border py-3 pl-8 pr-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 ${
                    errors.bidAmount
                      ? "border-red-500 focus:ring-red-100"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                />
              </div>

              {errors.bidAmount && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.bidAmount.message}
                </p>
              )}
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
                {...register("estimatedDuration")}
                className={`mt-3 w-full rounded-lg border bg-white px-4 py-3 text-gray-700 outline-none transition focus:ring-2 ${
                  errors.estimatedDuration
                    ? "border-red-500 focus:ring-red-100"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                }`}
              >
                <option value="">Select duration</option>
                <option value="Less than 1 week">Less than 1 week</option>
                <option value="1 week">1 week</option>
                <option value="2 weeks">2 weeks</option>
                <option value="3 weeks">3 weeks</option>
                <option value="1 month">1 month</option>
                <option value="1 - 3 months">1 - 3 months</option>
                <option value="3+ months">3+ months</option>
              </select>

              {errors.estimatedDuration && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.estimatedDuration.message}
                </p>
              )}
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
              disabled={isSubmitting}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Submitting..."
                : "Submit Proposal"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default SubmitProposal;
