/**
 * Admin Field Utilities
 *
 * Reusable utilities for normalizing admin field names
 * Handles different naming conventions (PascalCase, camelCase, etc.)
 */

/**
 * Extracts admin name from admin object, handling different field name variations
 * @param {Object} admin - Admin object
 * @returns {string} Admin name or 'N/A' if not found
 */
export const getAdminName = (admin) => {
  return admin?.UserName || admin?.userName || admin?.name || 'N/A';
};

/**
 * Extracts admin email from admin object, handling different field name variations
 * @param {Object} admin - Admin object
 * @returns {string} Admin email or 'N/A' if not found
 */
export const getAdminEmail = (admin) => {
  return admin?.Email || admin?.email || 'N/A';
};

/**
 * Extracts admin phone from admin object, handling different field name variations
 * @param {Object} admin - Admin object
 * @returns {string} Admin phone or 'N/A' if not found
 */
export const getAdminPhone = (admin) => {
  return admin?.Phone || admin?.PhoneNumber || admin?.phone || 'N/A';
};

/**
 * Extracts admin role from admin object, handling different field name variations
 * @param {Object} admin - Admin object
 * @returns {string} Admin role or 'N/A' if not found
 */
export const getAdminRole = (admin) => {
  return admin?.Role || admin?.role || 'N/A';
};

/**
 * Extracts admin profile image from admin object, handling different field name variations
 * @param {Object} admin - Admin object
 * @returns {string|null} Admin profile image URL or null if not found
 */
export const getAdminProfileImage = (admin) => {
  return admin?.ProfileImg || admin?.profileImage || null;
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
