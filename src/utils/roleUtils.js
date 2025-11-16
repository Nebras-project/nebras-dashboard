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

export const ADMIN_ROLE_VALUES = [
  'Owner',
  'General Admin',
  'Curriculum Manager',
  'Competition Manager',
  'Content Manager',
];

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

/**
 * Filter role options based on current user role
 * Used for admin creation forms to restrict which roles can be assigned
 *
 * Rules:
 * - Owner: can see all roles
 * - General Admin: can see all roles except Owner and General Admin
 * - Other roles: cannot create admins (should be handled by route protection)
 *
 * @param {boolean} isOwner - Whether the current user is an Owner
 * @param {boolean} isGeneralAdmin - Whether the current user is a General Admin
 * @returns {string[]} Filtered role values
 */
export const filterRoleOptions = (isOwner, isGeneralAdmin) => {
  if (isOwner) {
    // Owner can see all roles
    return ADMIN_ROLE_VALUES;
  }

  if (isGeneralAdmin) {
    // General Admin can see all roles except Owner and General Admin
    return ADMIN_ROLE_VALUES.filter((role) => role !== 'Owner' && role !== 'General Admin');
  }

  // Other roles cannot create admins (should be handled by route protection)
  return [];
};

/**
 * Check if row actions should be shown based on user permissions and row data.
 *
 * Rules:
 * - If checkPermissions is false or row is not provided, always show actions.
 * - Owner: can see actions for all rows.
 * - General Admin: can see actions for all rows except Owner and General Admin rows.
 * - Other roles: cannot see any actions.
 *
 * @param {Object} options - Options object
 * @param {boolean} options.isOwner - Whether the current user is an Owner.
 * @param {boolean} options.isGeneralAdmin - Whether the current user is a General Admin.
 * @param {Object} options.row - The data of the current row.
 * @param {boolean} options.checkPermissions - Flag to enable/disable permission checks.
 * @returns {boolean} - True if actions should be shown, false otherwise.
 */
export const checkRowActionsPermissions = ({ isOwner, isGeneralAdmin, row, checkPermissions }) => {
  if (!checkPermissions || !row) {
    return true; // Show actions if no permission check needed or row is missing
  }

  // Owner: show actions for all rows
  if (isOwner) {
    return true;
  }

  // General Admin: show actions for all rows except Owner and General Admin rows
  if (isGeneralAdmin && row.Role !== 'Owner' && row.Role !== 'General Admin') {
    return true;
  }

  // Other roles: no actions
  return false;
};
