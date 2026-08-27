import React from 'react';
import { NavLink } from "react-router-dom";

const FreelancerCard = ({freelancer}) => {
  return (
    <div
              key={freelancer.id}
              className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* Profile Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">

                  {/* Avatar */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
                    {freelancer.name?.charAt(0)}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {freelancer.name}
                    </h3>

                    <p className="text-sm font-medium text-blue-600">
                      {freelancer.title}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {freelancer.location}
                    </p>
                  </div>
                </div>

                {/* Rate */}
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    {freelancer.hourlyRate}
                  </p>

                  <p className="text-xs text-gray-500">
                    Hourly
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="mt-5 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>

                  <span className="font-semibold text-gray-900">
                    {freelancer.rating}
                  </span>
                </div>

                <span className="text-sm text-gray-500">
                  ({freelancer.reviews} reviews)
                </span>

                <span className="text-gray-300">
                  •
                </span>

                <span className="text-sm text-gray-500">
                  {freelancer.jobsCompleted} jobs
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm leading-6 text-gray-600">
                {freelancer.description}
              </p>

              {/* Skills */}
              <div className="mt-5 flex flex-wrap gap-2">
                {freelancer.skills?.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Availability */}
              <div className="mt-5 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />

                <span className="text-sm font-medium text-green-600">
                  {freelancer.availability}
                </span>
              </div>

              {/* Footer */}
              <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
                <button className="text-sm font-medium text-gray-600 hover:text-blue-600">
                  Save
                </button>

                <NavLink
                  to={`/app/freelancers/${freelancer.id}`}
                  className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
                >
                  View Profile
                </NavLink>
              </div>
            </div>
  )
}

export default FreelancerCard