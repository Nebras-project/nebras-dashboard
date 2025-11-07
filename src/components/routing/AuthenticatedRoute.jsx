import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '@hooks';
import { useRole } from '@features/authentication';
import { Loader } from '@components';

/**
 * AuthenticatedRoute Component
 *
 * Protects routes by checking:
 * 1. Authentication status
 * 2. User role (if allowedRoles is provided)
 *
 * @param {ReactNode} children - Child components to render if access is granted
 * @param {string|string[]} allowedRoles - Role(s) allowed to access this route
 * @param {boolean} requireAuth - Whether authentication is required (default: true)
 */
function AuthenticatedRoute({ children, allowedRoles, requireAuth = true }) {
  const { isAuthenticated, isLoading } = useAuth();
  const { hasRole } = useRole();

  // Show loading state while checking authentication
  if (isLoading) {
    return <Loader variant="fullscreen" />;
  }

  // Check authentication
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check role-based access if allowedRoles is provided
  if (allowedRoles && !hasRole(allowedRoles)) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
}

AuthenticatedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  requireAuth: PropTypes.bool,
};

export default AuthenticatedRoute;
