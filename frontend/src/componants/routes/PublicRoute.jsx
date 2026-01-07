import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PublicRoute({ children }) {
  const { authUser } = useSelector((state) => state.user);

  if (authUser) {
    return <Navigate to="/chat" replace />;
  }

  return children;
}

export default PublicRoute;
