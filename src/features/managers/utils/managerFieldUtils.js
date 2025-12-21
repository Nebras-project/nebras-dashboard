/**
 * Manager Field Utilities
 *
 * Reusable utilities for normalizing manager field names
 * Handles different naming conventions (PascalCase, camelCase, etc.)
 */

import { getRoleLabel } from '@utils/roleUtils';

/**
 * Extracts manager name from manager object, handling different field name variations
 * @param {Object} manager - Manager object
 * @returns {string} Manager name or 'N/A' if not found
 */
export const getManagerName = (manager) => {
  return  manager?.userName || 'N/A';
};

/**
 * Extracts manager email from manager object, handling different field name variations
 * @param {Object} manager - Manager object
 * @returns {string} Manager email or 'N/A' if not found
 */
export const getManagerEmail = (manager) => {
  return manager?.email || 'N/A';
};

/**
 * Extracts manager phone from manager object, handling different field name variations
 * @param {Object} manager - Manager object
 * @returns {string} Manager phone or 'N/A' if not found
 */
export const getManagerPhone = (manager) => {
  return manager?.phoneNumber  || 'N/A';
};

/**
 * Extracts manager role from manager object, handling different field name variations
 * @param {Object} manager - Manager object
 * @param {Function} t - Translation function
 * @returns {string} Translated manager role or 'N/A' if not found
 */
export const getManagerRole = (manager, t) => {
  const role =  manager?.role;
  if (!role) return 'N/A';
  return getRoleLabel(role, t) || 'N/A';
};

/**
 * Extracts manager profile image from manager object, handling different field name variations
 * @param {Object} manager - Manager object
 * @returns {string|null} Manager profile image URL or null if not found
 */
export const getManagerProfileImage = (manager) => {
  return manager?.profileImage || null;
};

/**
 * Normalizes manager object to a consistent structure
 * @param {Object} manager - Manager object with potentially inconsistent field names
 * @returns {Object} Normalized manager object with consistent field names
 */
export const normalizeManager = (manager) => {
  if (!manager) return null;

  return {
    id: manager.userId,
    name: getManagerName(manager),
    email: getManagerEmail(manager),
    phone: getManagerPhone(manager),
    role: getManagerRole(manager),
    profileImage: getManagerProfileImage(manager),
    isActive: manager.isActive,
    createdAt: manager.createdAt,
    lastLogin: manager.lastLogin,
    // Preserve original data for backward compatibility
    ...manager,
  };
};
