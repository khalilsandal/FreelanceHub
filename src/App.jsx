import { Routes, Route } from "react-router-dom";

// Layout
import AppLayout from "./components/layout/AppLayout.jsx";

// Public pages
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";

// Protected pages
import Dashboard from "./pages/Dashboard/Dashboard.jsx";

import Jobs from "./pages/Jobs/Jobs.jsx";
import JobDetails from "./pages/Jobs/JobDetails.jsx";

import Freelancers from "./pages/Freelancers/Freelancers.jsx";
import FreelancerProfile from "./pages/Freelancers/FreelancerProfile.jsx";

import MyJobs from "./pages/MyJobs/MyJobs.jsx";
import CreateJob from "./pages/MyJobs/CreateJob.jsx";
import MyJobDetails from "./pages/MyJobs/MyJobDetails.jsx";

import MyProposals from "./pages/MyProposals/MyProposals.jsx";
import ProposalDetails from "./pages/MyProposals/ProposalDetails.jsx";

import Profile from "./pages/Profile/Profile.jsx";


import Settings from "./pages/Settings/Settings.jsx";
import SubmitProposal from "./pages/SubmitProposal/SubmitProposal.jsx";
import About from "./pages/About/About.jsx";




// Route protection
import ProtectedRoute from "./routes/ProtectedRoute.jsx";


function App() {
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
            <Route index element={<Jobs />} />
            <Route path=":jobId" element={<JobDetails />} />
            <Route path=":jobId/proposal" element={<SubmitProposal />} />
          </Route>


          {/* Freelancers */}
          <Route path="freelancers">
            <Route index element={<Freelancers />} />
            <Route
              path=":freelancerId"
              element={<FreelancerProfile />}
            />
          </Route>


          {/* My Jobs */}
          <Route path="my-jobs">
            <Route index element={<MyJobs />} />
            <Route path="new" element={<CreateJob />} />
            <Route path=":jobId" element={<MyJobDetails />} />
          </Route>


          {/* My Proposals */}
          <Route path="my-proposals">
            <Route index element={<MyProposals />} />
            <Route
              path=":proposalId"
              element={<ProposalDetails />}
            />
          </Route>


          {/* Profile */}
          <Route path="profile" element={<Profile />} />

          {/* Settings */}
          <Route path="settings" element={<Settings />} />

        </Route>
      </Route>

    </Routes>
  );
}

export default App;
