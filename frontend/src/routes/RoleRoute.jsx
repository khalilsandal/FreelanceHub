import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function RoleRoute({ allowedRole, children }) {
  const { user } = useSelector(
    (state) => state.auth
  );

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== allowedRole) {
    if(user.role === "freelancer"){
        return <Navigate to="/app/jobs" replace />;
    }
    if(user.role === "client"){
        return <Navigate to="/app/freelancers" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RoleRoute;