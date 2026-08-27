import React, { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";

import { getBlogs } from "../../services/blogService";
import Loading from "../../components/common/Loading";

import ErrorState from "../../components/common/ErrorMessage/ErrorState";

const categories = [
  "All",
  "Freelancing",
  "Hiring",
  "Career",
  "Remote Work",
];

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  // Load blogs
  const loadBlogs = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getBlogs();

      setBlogs(data);
    } catch (err) {
      setError("Failed to load blog articles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  // Filter blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCategory =
        selectedCategory === "All" ||
        blog.category === selectedCategory;

      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        blog.title.toLowerCase().includes(searchText) ||
        blog.excerpt.toLowerCase().includes(searchText) ||
        blog.author.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [blogs, selectedCategory, search]);

  // Featured article
  const featuredBlog = blogs.find((blog) => blog.featured);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <ErrorState
        title="Something went wrong"
        message="We could not load the blog articles."
        onRetry={loadBlogs}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl text-center">

          <span className="inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
            FreelanceHub Blog
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Ideas, insights &{" "}
            <span className="text-blue-600">
              freelance advice
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            Discover useful tips and insights to help you find work,
            hire great talent, and grow your freelance career.
          </p>

          {/* Search */}
          <div className="mx-auto mt-8 max-w-xl">
            <div className="relative">

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <svg
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                />
              </svg>

            </div>
          </div>

        </div>
      </section>

      {/* Featured Article */}
      {featuredBlog && (
        <section className="px-6 py-12">
          <div className="mx-auto max-w-6xl">

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Featured Article
              </h2>
            </div>

            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

              <div className="grid grid-cols-1 lg:grid-cols-2">

                <img
                  src={featuredBlog.image}
                  alt={featuredBlog.title}
                  className="h-72 w-full object-cover lg:h-full"
                />

                <div className="flex flex-col justify-center p-8 lg:p-10">

                  <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                    {featuredBlog.category}
                  </span>

                  <h2 className="mt-4 text-3xl font-bold text-gray-900">
                    {featuredBlog.title}
                  </h2>

                  <p className="mt-4 leading-7 text-gray-600">
                    {featuredBlog.excerpt}
                  </p>

                  <div className="mt-6 flex items-center justify-between">

                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {featuredBlog.author}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {featuredBlog.date} · {featuredBlog.readTime}
                      </p>
                    </div>

                    <NavLink
                      to={`/blog/${featuredBlog.id}`}
                      className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
                    >
                      Read Article
                    </NavLink>

                  </div>

                </div>

              </div>

            </div>

          </div>
        </section>
      )}

      {/* Blog Articles */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-6xl">

          {/* Category Filters */}
          <div className="mb-8 flex flex-wrap gap-2">

            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}

          </div>

          {/* Results count */}
          <div className="mb-6 flex items-center justify-between">

            <p className="text-sm text-gray-500">
              {filteredBlogs.length}{" "}
              {filteredBlogs.length === 1
                ? "article"
                : "articles"}{" "}
              found
            </p>

            {(search || selectedCategory !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Clear filters
              </button>
            )}

          </div>

          {/* No Results */}
          {filteredBlogs.length === 0 ? (
            <div className="rounded-xl bg-white px-6 py-16 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-2xl">
                🔍
              </div>

              <h2 className="mt-5 text-xl font-semibold text-gray-900">
                No articles found
              </h2>

              <p className="mt-2 text-gray-500">
                Try a different search term or category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
                className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
              >
                Clear Filters
              </button>

            </div>
          ) : (
            /* Blog Grid */
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

              {filteredBlogs.map((blog) => (
                <article
                  key={blog.id}
                  className="group overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >

                  {/* Image */}
                  <div className="overflow-hidden">

                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
                    />

                  </div>

                  {/* Content */}
                  <div className="p-6">

                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                      {blog.category}
                    </span>

                    <h2 className="mt-4 text-xl font-semibold text-gray-900 transition group-hover:text-blue-600">
                      {blog.title}
                    </h2>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                      {blog.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="mt-5 border-t pt-4">

                      <div className="flex items-center justify-between">

                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {blog.author}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {blog.date}
                          </p>
                        </div>

                        <span className="text-xs text-gray-500">
                          {blog.readTime}
                        </span>

                      </div>

                      <NavLink
                        to={`/blog/${blog.id}`}
                        className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
                      >
                        Read more →
                      </NavLink>

                    </div>

                  </div>

                </article>
              ))}

            </div>
          )}

        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 px-6 py-14">

        <div className="mx-auto max-w-4xl text-center">

          <h2 className="text-3xl font-bold text-white">
            Ready to start freelancing?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-blue-100">
            Create your profile, find opportunities, and connect with
            clients on FreelanceHub.
          </p>

          <NavLink
            to="/register"
            className="mt-7 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-gray-100"
          >
            Get Started
          </NavLink>

        </div>

      </section>

    </div>
  );
};

export default Blog;