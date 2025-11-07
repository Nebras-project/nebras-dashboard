/**
 * Role Utilities
 * Provides role constants and utility functions for RBAC
 */

// Role constants
export const ROLES = {
  OWNER: 'owner',
  GENERAL_ADMIN: 'general_admin',
  CURRICULUM_MANAGER: 'curriculum_manager',
  COMPETITION_MANAGER: 'competition_manager',
  CONTENT_MANAGER: 'content_manager',
};

// Allowed roles for each route
export const ALLOWED_ROLES = {
  // All authenticated users
  ALL: [
    ROLES.OWNER,
    ROLES.GENERAL_ADMIN,
    ROLES.CURRICULUM_MANAGER,
    ROLES.COMPETITION_MANAGER,
    ROLES.CONTENT_MANAGER,
  ],
  // Owner & General Admin only
  OWNER_AND_ADMIN: [ROLES.OWNER, ROLES.GENERAL_ADMIN],
  // Owner only
  OWNER_ONLY: [ROLES.OWNER],
  // Curriculum routes (Owner, General Admin & Curriculum Manager)
  CURRICULUM: [ROLES.OWNER, ROLES.GENERAL_ADMIN, ROLES.CURRICULUM_MANAGER],
  // Competition routes (Owner, General Admin & Competition Manager)
  COMPETITION: [ROLES.OWNER, ROLES.GENERAL_ADMIN, ROLES.COMPETITION_MANAGER],
  // Question routes (Owner, General Admin & Content Manager)
  QUESTIONS: [ROLES.OWNER, ROLES.GENERAL_ADMIN, ROLES.CONTENT_MANAGER],
};

/**
 * Check if a role has access to a resource
 * @param {string} userRole - The user's role
 * @param {string|string[]} allowedRoles - Role(s) allowed to access
 * @returns {boolean} - True if user has access
 */
export const hasRole = (userRole, allowedRoles) => {
  if (!userRole || !allowedRoles) return false;
  const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  return rolesArray.includes(userRole);
};
