import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";
// wrap around logged-in user only routes to protect them
function ProtectedRoute({ redirectPath = "/login", children }) {
  const { currentUser } = useUserContext();
  if (!currentUser?.email) {
    return <Navigate to={redirectPath} replace />;
  }
  // works for both nested and standalone routes
  return children ? children : <Outlet />;
}
export default ProtectedRoute;
// save as routes/ProtectedRoute.jsx
// update AppRoutes.jsx to protect the Dashboard
