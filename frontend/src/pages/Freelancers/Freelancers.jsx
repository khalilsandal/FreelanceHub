import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getFreelancers } from "../../services/freelancerService";
import Loading from "../../components/common/Loading.jsx";
import FreelancerCard from "../../components/freelancers/FreelancerCard/FreelancerCard";
import ErrorState from "../../components/common/ErrorMessage/ErrorState";

const Freelancers = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [rate, setRate] = useState("Any rate");

  // Load freelancers
  const loadFreelancers = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getFreelancers();

      setFreelancers(data);
    } catch (err) {
      setError("Failed to load Freelancers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFreelancers();
  }, []);

  // Loading state
  if (loading) {
    return <Loading />;
  }

  // Error state
  if (error) {
    return (
      <ErrorState
        title="Something went wrong"
        message="We could not get freelancers"
        onRetry={loadFreelancers}
      />
    );
  }

  // Filter freelancers
  const filteredFreelancers = freelancers.filter((freelancer) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      freelancer.name?.toLowerCase().includes(searchText) ||
      freelancer.title?.toLowerCase().includes(searchText) ||
      freelancer.description?.toLowerCase().includes(searchText) ||
      freelancer.skills?.some((skill) =>
        skill.toLowerCase().includes(searchText)
      );

    // Category
    let matchesCategory = true;

    if (category !== "All categories") {
      matchesCategory =
        freelancer.title
          ?.toLowerCase()
          .includes(category.toLowerCase()) ||
        freelancer.skills?.some((skill) =>
          skill.toLowerCase().includes(category.toLowerCase())
        );
    }

    // Hourly rate
    const hourlyRate = parseInt(
      freelancer.hourlyRate?.replace(/[^0-9]/g, ""),
      10
    );

    let matchesRate = true;

    if (rate === "Under $25/hr") {
      matchesRate = hourlyRate < 25;
    }

    if (rate === "$25 - $50/hr") {
      matchesRate = hourlyRate >= 25 && hourlyRate <= 50;
    }

    if (rate === "$50 - $100/hr") {
      matchesRate = hourlyRate > 50 && hourlyRate <= 100;
    }

    if (rate === "$100+/hr") {
      matchesRate = hourlyRate > 100;
    }

    return matchesSearch && matchesCategory && matchesRate;
  });

  // Clear filters
  const clearFilters = () => {
    setSearch("");
    setCategory("All categories");
    setRate("Any rate");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Find Talent
          </h1>

          <p className="mt-2 text-gray-600">
            Find skilled freelancers and build your perfect team.
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
                Search talent or skills
              </label>

              <input
                id="search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="React, Python, Figma..."
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
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option>All categories</option>
                <option>React</option>
                <option>Node.js</option>
                <option>Python</option>
                <option>Figma</option>
                <option>SEO</option>
              </select>
            </div>

            {/* Hourly rate */}
            <div>
              <label
                htmlFor="rate"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Hourly rate
              </label>

              <select
                id="rate"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option>Any rate</option>
                <option>Under $25/hr</option>
                <option>$25 - $50/hr</option>
                <option>$50 - $100/hr</option>
                <option>$100+/hr</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Top Freelancers
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {filteredFreelancers.length} freelancers found
          </p>
        </div>

        {/* Empty state */}
        {filteredFreelancers.length === 0 && (
          <div className="rounded-xl bg-white p-12 text-center shadow-sm ring-1 ring-gray-200">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <span className="text-2xl">🔍</span>
            </div>

            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              No freelancers found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try searching for another skill or changing your filters.
            </p>

            <button
              onClick={clearFilters}
              className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Freelancer List */}
        <div className="grid gap-5 lg:grid-cols-2">
          {filteredFreelancers.map((freelancer) => (
            <FreelancerCard freelancer={freelancer} key={freelancer.id}/>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Freelancers;