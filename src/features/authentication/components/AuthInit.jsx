/**
 * AuthInit Component
 *
 * Initializes authentication state on app load by fetching current user data
 * This ensures user data persists across page reloads
 */

import { useAuthInit } from '../hooks/useAuthInit';

/**
 * Component that initializes auth state on mount
 * Uses the useAuthInit hook to fetch current user data and restore it to Redux store
 */
function AuthInit() {
  // Initialize authentication state
  useAuthInit();

  // This component doesn't render anything
  return null;
}

export default AuthInit;
