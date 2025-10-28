import { Navigate } from "react-router-dom";

/**
 * Wrap pages that require login like:
 * <Route path="/ho" element={<ProtectedRoute><Home /></ProtectedRoute>} />
 */
export default function ProtectedRoute({ children }) {
  const e = localStorage.getItem("email");
  if (!e) return <Navigate to="/" replace />;
  return children;
}
