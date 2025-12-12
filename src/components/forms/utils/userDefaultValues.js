/**
 * Build base default values for user-like forms (admins, students, ...).
 *
 * Handles common fields and PascalCase/camelCase compatibility.
 *
 * @param {Object} values - Raw values from API / table row
 * @returns {Object} default form values for common user fields
 */
export const buildBaseUserDefaultValues = (values = {}) => ({
  UserName: values.UserName || '',
  Email: values.Email || '',
  PhoneNumber: values.PhoneNumber || '',
  Password: '',
  ConfirmPassword: '',
  UserProfile: values.UserProfile || null,
});
