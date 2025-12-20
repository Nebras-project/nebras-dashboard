/**
 * Admin Field Utilities
 *
 * Reusable utilities for normalizing admin field names
 * Handles different naming conventions (PascalCase, camelCase, etc.)
 */

import { getRoleLabel } from '@utils/roleUtils';

/**
 * Extracts admin name from admin object, handling different field name variations
 * @param {Object} admin - Admin object
 * @returns {string} Admin name or 'N/A' if not found
 */
export const getAdminName = (admin) => {
  return admin?.userName || 'N/A';
};

/**
 * Extracts admin email from admin object, handling different field name variations
 * @param {Object} admin - Admin object
 * @returns {string} Admin email or 'N/A' if not found
 */
export const getAdminEmail = (admin) => {
  return  admin?.email || 'N/A';
};

/**
 * Extracts admin phone from admin object, handling different field name variations
 * @param {Object} admin - Admin object
 * @returns {string} Admin phone or 'N/A' if not found
 */
export const getAdminPhone = (admin) => {
  return admin?.phoneNumber || 'N/A';
};

/**
 * Extracts admin role from admin object, handling different field name variations
 * @param {Object} admin - Admin object
 * @param {Function} t - Translation function
 * @returns {string} Translated admin role or 'N/A' if not found
 */
export const getAdminRole = (admin, t) => {
  const role = admin?.role;
  if (!role) return 'N/A';
  return getRoleLabel(role, t) || 'N/A';
};

/**
 * Extracts admin profile image from admin object, handling different field name variations
 * @param {Object} admin - Admin object
 * @returns {string|null} Admin profile image URL or null if not found
 */
export const getAdminProfileImage = (admin) => {
  return admin?.userProfile || null;
};

/**
 * Normalizes admin object to a consistent structure
 * @param {Object} admin - Admin object with potentially inconsistent field names
 * @returns {Object} Normalized admin object with consistent field names
 */
export const normalizeAdmin = (admin) => {
  if (!admin) return null;

  return {
    id: admin.id,
    name: getAdminName(admin),
    email: getAdminEmail(admin),
    phone: getAdminPhone(admin),
    role: getAdminRole(admin),
    profileImage: getAdminProfileImage(admin),
    isActive: admin.isActive,
    createdAt: admin.createdAt,
    lastLogin: admin.lastLogin,
    // Preserve original data for backward compatibility
    ...admin,
  };
};
