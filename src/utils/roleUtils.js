/**
 * Role Utilities
 * Provides role constants and utility functions for RBAC
 */

import { toCamelCase } from './caseUtils';

// Role constants
export const ROLES = {
  OWNER: 'owner',
  GENERAL_ADMIN: 'generalAdmin',
  GRADE_MANAGER: 'gradeManager',
  COMPETITION_MANAGER: 'competitionManager',
  CONTENT_MANAGER: 'contentManager',
};

// Role translation keys mapping
export const roleTranslationKeys = {
  owner: 'users.owner',
  generalAdmin: 'users.generalAdmin',
  gradeManager: 'users.gradeManager',
  competitionManager: 'users.competitionManager',
  contentManager: 'users.contentManager',
  // Handle PascalCase role values from API (e.g., "Owner", "General Admin")
  Owner: 'users.owner',
  'General Admin': 'admins.roles.General Admin',
  'Grade Manager': 'admins.roles.Grade Manager',
  'Competition Manager': 'admins.roles.Competition Manager',
  'Content Manager': 'admins.roles.Content Manager',
};

// Admin role values in PascalCase/display format (as returned by API and used in forms)
// These values MUST match the exact format that the API expects/returns for admin roles.
// If the API format changes, update this array to match the new format.
// Used for admin creation/editing forms and table filters.
export const ADMIN_ROLE_VALUES = [
  'Owner',
  'General Admin',
  'Grade Manager',
  'Competition Manager',
  'Content Manager',
];

// Allowed roles for each route
export const ALLOWED_ROLES = {
  // All authenticated users
  ALL: [
    ROLES.OWNER,
    ROLES.GENERAL_ADMIN,
    ROLES.GRADE_MANAGER,
    ROLES.COMPETITION_MANAGER,
    ROLES.CONTENT_MANAGER,
  ],
  // Owner & General Admin only
  OWNER_AND_ADMIN: [ROLES.OWNER, ROLES.GENERAL_ADMIN],
  // Owner only
  OWNER_ONLY: [ROLES.OWNER],
  // Grade routes (Owner, General Admin & Grade Manager)
  GRADE: [ROLES.OWNER, ROLES.GENERAL_ADMIN, ROLES.GRADE_MANAGER],
  // Competition routes (Owner, General Admin & Competition Manager)
  COMPETITION: [ROLES.OWNER, ROLES.GENERAL_ADMIN, ROLES.COMPETITION_MANAGER],
  // Question routes (Owner, General Admin & Content Manager)
  QUESTIONS: [ROLES.OWNER, ROLES.GENERAL_ADMIN, ROLES.CONTENT_MANAGER],
};

/**
 * Convert role string to camelCase format
 * Uses the general toCamelCase utility function
 *
 * @param {string} role - Role string in any format
 * @returns {string} Role in camelCase format
 */
export const normalizeRoleToCamelCase = (role) => {
  if (!role || typeof role !== 'string') return role;
  return toCamelCase(role);
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
