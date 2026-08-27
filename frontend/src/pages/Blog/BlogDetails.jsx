import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import { getBlogById } from "../../services/blogService";
import Loading from "../../components/common/Loading";
import ErrorState from "../../components/common/ErrorMessage/ErrorState";

const BlogDetails = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadBlog = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getBlogById(postId);

      setBlog(data);
    } catch (err) {
      setError("Failed to load this article.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlog();
  }, [postId]);

  if (loading) {
    return <Loading />;
  }

  if (error || !blog) {
    return (
      <ErrorState
        title="Article not found"
        message="We could not find the article you are looking for."
        onRetry={loadBlog}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Back to Blog */}
      <div className="mx-auto max-w-5xl px-6 pt-8">
        <button
          onClick={() => navigate("/blog")}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-blue-600"
        >
          <span>←</span>
          Back to Blog
        </button>
      </div>

      {/* Article Header */}
      <article className="mx-auto max-w-5xl px-6 py-10">

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

          {/* Cover Image */}
          <img
            src={blog.image}
            alt={blog.title}
            className="h-64 w-full object-cover sm:h-80 lg:h-[420px]"
          />

          {/* Article Content */}
          <div className="px-6 py-8 sm:px-10 lg:px-14 lg:py-12">

            {/* Category */}
            <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600">
              {blog.category}
            </span>

            {/* Title */}
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              {blog.title}
            </h1>

            {/* Excerpt */}
            <p className="mt-5 text-lg leading-8 text-gray-600">
              {blog.excerpt}
            </p>

            {/* Author Info */}
            <div className="mt-8 flex flex-wrap items-center gap-4 border-b border-gray-200 pb-8">

              {/* Avatar */}
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                {blog.author?.charAt(0)}
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  {blog.author}
                </p>

                <div className="mt-1 flex flex-wrap gap-2 text-sm text-gray-500">
                  <span>{blog.date}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>
              </div>

            </div>

            {/* Article Body */}
            <div className="prose prose-lg mt-10 max-w-none">

              {blog.content
                .split("\n")
                .filter((paragraph) => paragraph.trim() !== "")
                .map((paragraph, index) => (
                  <p
                    key={index}
                    className="mb-6 leading-8 text-gray-700"
                  >
                    {paragraph}
                  </p>
                ))}

            </div>

          </div>

        </div>

      </article>

      {/* Bottom Navigation */}
      <section className="px-6 pb-16">

        <div className="mx-auto max-w-5xl">

          <div className="rounded-2xl bg-blue-600 px-6 py-10 text-center sm:px-10">

            <h2 className="text-2xl font-bold text-white">
              Want to discover more?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-blue-100">
              Explore more articles and discover useful tips for
              freelancers and employers.
            </p>

            <NavLink
              to="/blog"
              className="mt-6 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-gray-100"
            >
              Explore More Articles
            </NavLink>

          </div>

        </div>

      </section>

    </div>
  );
};

export default BlogDetails;