/**
 * Role Utilities
 * Provides role constants and utility functions for RBAC
 */

// Role constants
export const ROLES = {
  OWNER: 'owner',
  GENERAL_ADMIN: 'generalAdmin',
  CURRICULUM_MANAGER: 'curriculumManager',
  COMPETITION_MANAGER: 'competitionManager',
  CONTENT_MANAGER: 'contentManager',
};

// Role translation keys mapping
export const roleTranslationKeys = {
  owner: 'users.owner',
  generalAdmin: 'users.generalAdmin',
  curriculumManager: 'users.curriculumManager',
  competitionManager: 'users.competitionManager',
  contentManager: 'users.contentManager',
  // Handle PascalCase role values from API (e.g., "Owner", "General Admin")
  Owner: 'users.owner',
  'General Admin': 'admins.roles.General Admin',
  'Curriculum Manager': 'admins.roles.Curriculum Manager',
  'Competition Manager': 'admins.roles.Competition Manager',
  'Content Manager': 'admins.roles.Content Manager',
};

// Student class translation keys mapping
export const classTranslationKeys = {
  thirdSecondary: 'students.classes.thirdSecondary',
  ninth: 'students.classes.ninth',
  // Handle snake_case variant
  third_secondary: 'students.classes.thirdSecondary',
};

// Admin role values in PascalCase/display format (as returned by API and used in forms)
// These values MUST match the exact format that the API expects/returns for admin roles.
// If the API format changes, update this array to match the new format.
// Used for admin creation/editing forms and table filters.
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
 * Build role options (value/label) for selects and table filters
 * using the same filtering rules as filterRoleOptions.
 *
 * @param {Function} t - Translation function (optional)
 * @param {boolean} isOwner
 * @param {boolean} isGeneralAdmin
 * @returns {{ value: string, label: string }[]}
 */
export const buildRoleOptions = (t, isOwner, isGeneralAdmin) => {
  const values = filterRoleOptions(isOwner, isGeneralAdmin);

  return values.map((value) => ({
    value,
    label: t ? getRoleLabel(value, t) : value,
  }));
};

/**
 * Get translation key for a role
 * Handles both camelCase (from user object) and PascalCase/display names (from admin API)
 *
 * @param {string} role - The role value (e.g., 'owner', 'Owner', 'General Admin')
 * @returns {string} Translation key for the role
 */
export const getRoleTranslationKey = (role) => {
  if (!role) return role;
  return roleTranslationKeys[role] || role;
};

/**
 * Get translated role label
 * Convenience function that combines getRoleTranslationKey with translation function
 *
 * @param {string} role - The role value
 * @param {Function} t - Translation function
 * @returns {string} Translated role label
 */
export const getRoleLabel = (role, t) => {
  if (!role || !t) return role || '';
  const translationKey = getRoleTranslationKey(role);
  return t(translationKey) || role;
};

/**
 * Get translation key for a student class
 * Handles both camelCase and snake_case variants
 *
 * @param {string} classValue - The class value (e.g., 'thirdSecondary', 'third_secondary', 'ninth')
 * @returns {string} Translation key for the class
 */
export const getClassTranslationKey = (classValue) => {
  if (!classValue) return classValue;
  return classTranslationKeys[classValue] || classValue;
};

/**
 * Get translated student class label
 * Convenience function that combines getClassTranslationKey with translation function
 *
 * @param {string} classValue - The class value
 * @param {Function} t - Translation function
 * @returns {string} Translated class label
 */
export const getClassLabel = (classValue, t) => {
  if (!classValue || !t) return classValue || '';
  const translationKey = getClassTranslationKey(classValue);
  return t(translationKey) || classValue;
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
