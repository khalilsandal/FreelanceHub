
// Layout
import AppLayout from "../components/layout/AppLayout.jsx";

// Public pages
import Home from "../pages/Home/Home.jsx";
import Login from "../pages/Login/Login.jsx";
import Register from "../pages/Register/Register.jsx";

// Protected pages
import Dashboard from "../pages/Dashboard/Dashboard.jsx";

import Jobs from "../pages/Jobs/Jobs.jsx";
import JobDetails from "../pages/Jobs/JobDetails.jsx";

import Freelancers from "../pages/Freelancers/Freelancers.jsx";
import FreelancerProfile from "../pages/Freelancers/FreelancerProfile.jsx";

import MyJobs from "../pages/MyJobs/MyJobs.jsx";
import CreateJob from "../pages/MyJobs/CreateJob.jsx";
import MyJobDetails from "../pages/MyJobs/MyJobDetails.jsx";

import MyProposals from "../pages/MyProposals/MyProposals.jsx";
import ProposalDetails from "../pages/MyProposals/ProposalDetails.jsx";

import Profile from "../pages/Profile/Profile.jsx";


import Settings from "../pages/Settings/Settings.jsx";
import SubmitProposal from "../pages/SubmitProposal/SubmitProposal.jsx";
import About from "../pages/About/About.jsx";
import Blog from "../pages/Blog/Blog.jsx";
import BlogDetails from "../pages/Blog/BlogDetails.jsx";

import SavedJobs from "../pages/SavedJobs/SavedJobs.jsx";
import Messages from "../pages/Messages/Messages.jsx";
import { Routes, Route } from "react-router-dom";

// Route protection
import ProtectedRoute from "./ProtectedRoute.jsx";
import RoleRoute from "./RoleRoute.jsx";

const AppRoutes = () => {
  return (
     <Routes>

      {/* =========================
          PUBLIC ROUTES
      ========================== */}
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="about" element={<About />} />
        <Route path="blog">
          <Route index element={<Blog />} />
          <Route path=":postId" element={<BlogDetails />} />
        </Route>
      </Route>

      {/* =========================
          PROTECTED APPLICATION
      ========================== */}
      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<AppLayout />}>

          {/* Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />


          {/* Jobs */}
          
          <Route path="jobs">
            <Route index element={<RoleRoute allowedRole="freelancer"><Jobs /></RoleRoute>} />
            <Route path=":jobId" element={<RoleRoute allowedRole="freelancer"><JobDetails /></RoleRoute>} />
            <Route path=":jobId/proposal" element={<RoleRoute allowedRole="freelancer"><SubmitProposal /></RoleRoute>} />
            <Route path="saved-jobs" element={<RoleRoute allowedRole="freelancer"><SavedJobs /></RoleRoute>} />
            <Route path="messages" element={<Messages />} />
          </Route>


          {/* Freelancers */}
          <Route path="freelancers">
            <Route index element={<RoleRoute allowedRole="client"><Freelancers /></RoleRoute>} />
            <Route
              path=":freelancerId"
              element={<RoleRoute allowedRole="client"><FreelancerProfile /></RoleRoute>}
            />
          </Route>


          {/* My Jobs */}
          <Route path="my-jobs">
            <Route index element={<RoleRoute allowedRole="client"><MyJobs /></RoleRoute>} />
            <Route path="new" element={<RoleRoute allowedRole="client"><CreateJob /></RoleRoute>} />
            <Route path=":jobId" element={<RoleRoute allowedRole="client"><MyJobDetails /></RoleRoute>} />
            
            
          </Route>


          {/* My Proposals */}
          <Route path="my-proposals">
            <Route index element={<RoleRoute allowedRole="freelancer"><MyProposals /></RoleRoute>} />
            <Route
              path=":proposalId"
              element={<RoleRoute allowedRole="freelancer"><ProposalDetails /></RoleRoute>}
            />
          </Route>


          {/* Profile */}
          <Route path="profile/:userId" element={<Profile />} />

          {/* Settings */}
          <Route path="settings" element={<Settings />} />

        </Route>
      </Route>

    </Routes>
  )
}

export default AppRoutes