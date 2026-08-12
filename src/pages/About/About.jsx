import React from "react";
import { NavLink } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl text-center">

          <span className="inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
            About FreelanceHub
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Connecting talented people with
            <span className="text-blue-600"> great opportunities.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            FreelanceHub is a platform designed to make freelance work
            simple, accessible, and rewarding for both freelancers and
            employers.
          </p>

        </div>
      </section>

      {/* Mission */}
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">

          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Our Mission
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              Making freelance work easier for everyone.
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              Finding the right freelancer or the right project shouldn't
              be complicated. FreelanceHub brings employers and talented
              professionals together in one simple platform.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Whether you're looking for your next project or searching
              for someone to bring your idea to life, our platform helps
              you connect, collaborate, and grow.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <NavLink
                to="/app/freelancers"
                className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Find Talent
              </NavLink>

              <NavLink
                to="/app/jobs"
                className="rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Find Work
              </NavLink>

            </div>
          </div>

          {/* Visual card */}
          <div className="relative">

            <div className="rounded-2xl bg-blue-600 p-8 shadow-xl">

              <div className="rounded-xl bg-white p-6">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-xl">
                    💼
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      FreelanceHub
                    </p>

                    <p className="text-sm text-gray-500">
                      Work. Connect. Grow.
                    </p>
                  </div>

                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">

                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-2xl font-bold text-blue-600">
                      1K+
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Freelancers
                    </p>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-2xl font-bold text-blue-600">
                      500+
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Projects
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Values */}
      <section className="bg-white px-6 py-16">

        <div className="mx-auto max-w-6xl">

          <div className="mx-auto max-w-2xl text-center">

            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              What We Believe
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              Built around people
            </h2>

            <p className="mt-4 text-gray-600">
              Our platform is designed around the needs of freelancers
              and employers.
            </p>

          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">

            {/* Card 1 */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 transition hover:-translate-y-1 hover:shadow-lg">

              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-2xl">
                🤝
              </div>

              <h3 className="mt-5 text-xl font-semibold text-gray-900">
                Collaboration
              </h3>

              <p className="mt-3 leading-6 text-gray-600">
                We believe great results come from bringing talented
                people and great ideas together.
              </p>

            </div>

            {/* Card 2 */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 transition hover:-translate-y-1 hover:shadow-lg">

              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-2xl">
                🚀
              </div>

              <h3 className="mt-5 text-xl font-semibold text-gray-900">
                Growth
              </h3>

              <p className="mt-3 leading-6 text-gray-600">
                We help freelancers build their careers and employers
                grow their businesses.
              </p>

            </div>

            {/* Card 3 */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 transition hover:-translate-y-1 hover:shadow-lg">

              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-2xl">
                ⭐
              </div>

              <h3 className="mt-5 text-xl font-semibold text-gray-900">
                Quality
              </h3>

              <p className="mt-3 leading-6 text-gray-600">
                We aim to create an environment where quality work and
                professional relationships can thrive.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-16">

        <div className="mx-auto max-w-6xl">

          <div className="text-center">

            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              How It Works
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              Simple from start to finish
            </h2>

          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">

            <div className="text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                1
              </div>

              <h3 className="mt-5 text-xl font-semibold text-gray-900">
                Create your profile
              </h3>

              <p className="mt-3 text-gray-600">
                Showcase your skills, experience and professional
                background.
              </p>

            </div>

            <div className="text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                2
              </div>

              <h3 className="mt-5 text-xl font-semibold text-gray-900">
                Find opportunities
              </h3>

              <p className="mt-3 text-gray-600">
                Discover jobs or talented professionals that match
                your needs.
              </p>

            </div>

            <div className="text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                3
              </div>

              <h3 className="mt-5 text-xl font-semibold text-gray-900">
                Get the work done
              </h3>

              <p className="mt-3 text-gray-600">
                Connect, collaborate and build successful professional
                relationships.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 px-6 py-16">

        <div className="mx-auto max-w-4xl text-center">

          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to get started?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Join FreelanceHub and take the next step in your freelance
            journey.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">

            <NavLink
              to="/register"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-gray-100"
            >
              Create Account
            </NavLink>

            <NavLink
              to="/app/jobs"
              className="rounded-lg border border-blue-400 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Browse Jobs
            </NavLink>

          </div>

        </div>

      </section>

    </div>
  );
};

export default About;