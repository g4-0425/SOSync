import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute
 *
 * @param {object} props
 * @param {ReactNode} props.children - route element to render when allowed
 * @param {string[]} [props.allowedRoles] - optional list of roles permitted to view the route
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  // Not logged in – send to login page, preserving intended destination
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in but role restriction present
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect to a generic access‑denied page
    return <Navigate to="/access-denied" replace />;
  }

  // All good – render the protected content
  return children;
}
