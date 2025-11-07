// external imports
import { useMemo } from 'react';

// internal imports
import { useAuth } from '@hooks';
import { ROLES, hasRole } from '@utils/roleUtils';

/**
 * Custom hook for role-based access control
 *
 * Provides role checking utilities and role-specific boolean flags
 *
 * @returns {Object} Role checking utilities and flags
 */
export const useRole = () => {
  const { role } = useAuth();

  return useMemo(
    () => ({
      // Current role
      role,

      // Role-specific boolean flags
      isOwner: role === ROLES.OWNER,
      isGeneralAdmin: role === ROLES.GENERAL_ADMIN,
      isCurriculumManager: role === ROLES.CURRICULUM_MANAGER,
      isCompetitionManager: role === ROLES.COMPETITION_MANAGER,
      isContentManager: role === ROLES.CONTENT_MANAGER,

      // Utility functions
      hasRole: (allowedRoles) => hasRole(role, allowedRoles),
    }),
    [role]
  );
};
