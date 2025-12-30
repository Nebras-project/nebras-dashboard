/**
 * Build base default values for user-like forms (admins, students, ...).
 *
 * Handles common fields and PascalCase/camelCase compatibility.
 *
 * @param {Object} values - Raw values from API / table row
 * @returns {Object} default form values for common user fields
 */
export const buildBaseUserDefaultValues = (values = {}) => ({
  userName: values.userName || '',
  email: values.email || '',
  phoneNumber: values.phoneNumber || '',
  password: '',
  confirmPassword: '',
  profileImage: values.profileImage || null,
  verifyEmail: values.emailConfirmed ?? false,
  sendVerificationEmail: false, // Always default to false, user must explicitly check it
});
