/**
 * Build base default values for user-like forms (admins, students, ...).
 *
 * Handles common fields and PascalCase/camelCase compatibility.
 *
 * @param {Object} values - Raw values from API / table row
 * @returns {Object} default form values for common user fields
 */
export const buildBaseUserDefaultValues = (values = {}) => ({
  UserName: values.UserName || values.userName || '',
  Email: values.Email || values.email || '',
  PhoneNumber: values.PhoneNumber || values.phoneNumber || '',
  Password: '',
  ConfirmPassword: '',
  ProfileImg: values.ProfileImg || values.profileImg || values.profileImage || null,
});
