import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">

        <div>
          <h2 className="text-2xl font-bold text-white">FreelanceHub</h2>
          <p className="mt-4 max-w-xs text-sm leading-6 text-gray-400">
            Connect with great talent and find
            opportunities that match your skills.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">For Clients</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <NavLink to="/app/jobs" className="transition hover:text-white" >Browse Jobs</NavLink>
            <NavLink to="/app/my-jobs/new" className="transition hover:text-white">Post a Job</NavLink>
            <NavLink to="/app/dashboard" className="transition hover:text-white">Client Dashboard</NavLink>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">For Freelancers</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <NavLink to="/app/jobs" className="transition hover:text-white">Find Work</NavLink>
            <NavLink to="/app/freelancers" className="transition hover:text-white">Find Freelancers</NavLink>
            <NavLink to="/app/my-proposals" className="transition hover:text-white">My Proposals</NavLink>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">FreelanceHub</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <NavLink to="/about" className="transition hover:text-white">About Us</NavLink>
            <a className="transition hover:text-white" href="/">Contact</a>
            <a className="transition hover:text-white" href="/">Privacy Policy</a>
            <a className="transition hover:text-white" href="/">Terms of Service</a>
          </div>
        </div>

      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-gray-800 px-6 py-6 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p className="text-gray-500">
          © {new Date().getFullYear()} FreelanceHub. All rights reserved.
        </p>

        <div className="flex gap-5">
          <a className="transition hover:text-white" href="/" aria-label="LinkedIn">
            LinkedIn
          </a>

          <a className="transition hover:text-white" href="/" aria-label="GitHub">
            GitHub
          </a>

          <a className="transition hover:text-white" href="/" aria-label="Twitter">
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
