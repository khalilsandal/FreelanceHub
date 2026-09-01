import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const jobSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters"),

  description: z
    .string()
    .min(20, "Description must be at least 20 characters"),

  category: z
    .string()
    .min(1, "Please select a category"),

  experienceLevel: z
    .string()
    .min(1, "Please select an experience level"),

  budgetType: z
    .string()
    .min(1, "Please select a budget type"),

  budget: z
    .number({
      invalid_type_error: "Budget must be a number",
    })
    .positive("Budget must be greater than 0"),

  skills: z
    .string()
    .min(1, "Please enter at least one skill"),
});

function CreateJob() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(jobSchema),

    defaultValues: {
      title: "",
      description: "",
      category: "",
      experienceLevel: "",
      budgetType: "fixed",
      budget: "",
      skills: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("Job data:", data);

    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Job created successfully!");

    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Post a New Job
          </h1>

          <p className="mt-2 text-gray-600">
            Tell freelancers what you need and find the right talent
            for your project.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-xl bg-white p-6 shadow-sm sm:p-8"
        >
          {/* Job Title */}
          <div className="mb-6">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Job Title
            </label>

            <input
              id="title"
              {...register("title")}
              placeholder="e.g. Build a React dashboard"
              className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 ${
                errors.title
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-200"
              }`}
            />

            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Description
            </label>

            <textarea
              id="description"
              rows={6}
              {...register("description")}
              placeholder="Describe your project, requirements, and what you expect from the freelancer..."
              className={`w-full resize-none rounded-lg border px-4 py-3 outline-none transition focus:ring-2 ${
                errors.description
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-200"
              }`}
            />

            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Category + Experience */}
          <div className="mb-6 grid gap-6 sm:grid-cols-2">

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
                {...register("category")}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              >
                <option value="">Select category</option>
                <option value="web-development">
                  Web Development
                </option>
                <option value="mobile-development">
                  Mobile Development
                </option>
                <option value="design">
                  Design & Creative
                </option>
                <option value="writing">
                  Writing & Translation
                </option>
                <option value="marketing">
                  Sales & Marketing
                </option>
              </select>

              {errors.category && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Experience */}
            <div>
              <label
                htmlFor="experienceLevel"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Experience Level
              </label>

              <select
                id="experienceLevel"
                {...register("experienceLevel")}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              >
                <option value="">Select experience</option>
                <option value="entry">Entry Level</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
              </select>

              {errors.experienceLevel && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.experienceLevel.message}
                </p>
              )}
            </div>

          </div>

          {/* Budget Type */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-gray-700">
              Budget Type
            </label>

            <div className="flex gap-6">

              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  value="fixed"
                  {...register("budgetType")}
                  className="h-4 w-4"
                />

                <span className="text-sm text-gray-700">
                  Fixed Price
                </span>
              </label>

              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  value="hourly"
                  {...register("budgetType")}
                  className="h-4 w-4"
                />

                <span className="text-sm text-gray-700">
                  Hourly Rate
                </span>
              </label>

            </div>

            {errors.budgetType && (
              <p className="mt-1 text-sm text-red-600">
                {errors.budgetType.message}
              </p>
            )}
          </div>

          {/* Budget */}
          <div className="mb-6">
            <label
              htmlFor="budget"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Budget
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>

              <input
                id="budget"
                type="number"
                {...register("budget", {
                  valueAsNumber: true,
                })}
                placeholder="500"
                className={`w-full rounded-lg border py-3 pl-8 pr-4 outline-none transition focus:ring-2 ${
                  errors.budget
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-200"
                }`}
              />
            </div>

            {errors.budget && (
              <p className="mt-1 text-sm text-red-600">
                {errors.budget.message}
              </p>
            )}
          </div>

          {/* Skills */}
          <div className="mb-8">
            <label
              htmlFor="skills"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Skills
            </label>

            <input
              id="skills"
              {...register("skills")}
              placeholder="React, JavaScript, Tailwind CSS"
              className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 ${
                errors.skills
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-200"
              }`}
            />

            <p className="mt-1 text-xs text-gray-500">
              Separate skills with commas.
            </p>

            {errors.skills && (
              <p className="mt-1 text-sm text-red-600">
                {errors.skills.message}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={() => reset()}
              disabled={isSubmitting}
              className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Reset
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Creating Job..." : "Post Job"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateJob;
