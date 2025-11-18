/**
 * Student Field Utilities
 *
 * Reusable utilities for normalizing student field names
 * Handles different naming conventions (PascalCase, camelCase, etc.)
 */

/**
 * Extracts student name from student object, handling different field name variations
 * @param {Object} student - Student object
 * @returns {string} Student name or 'N/A' if not found
 */
export const getStudentName = (student) => {
  return student?.UserName || student?.userName || student?.name || 'N/A';
};

/**
 * Extracts student email from student object, handling different field name variations
 * @param {Object} student - Student object
 * @returns {string} Student email or 'N/A' if not found
 */
export const getStudentEmail = (student) => {
  return student?.Email || student?.email || 'N/A';
};

/**
 * Extracts student phone from student object, handling different field name variations
 * @param {Object} student - Student object
 * @returns {string} Student phone or 'N/A' if not found
 */
export const getStudentPhone = (student) => {
  return student?.Phone || student?.PhoneNumber || student?.phone || 'N/A';
};

/**
 * Extracts student class from student object, handling different field name variations
 * @param {Object} student - Student object
 * @returns {string} Student class or 'N/A' if not found
 */
export const getStudentClass = (student) => {
  return student?.Class || student?.class || 'N/A';
};

/**
 * Extracts student profile image from student object, handling different field name variations
 * @param {Object} student - Student object
 * @returns {string|null} Student profile image URL or null if not found
 */
export const getStudentProfileImage = (student) => {
  return student?.ProfileImg || student?.profileImage || null;
};

/**
 * Normalizes student object to a consistent structure
 * @param {Object} student - Student object with potentially inconsistent field names
 * @returns {Object} Normalized student object with consistent field names
 */
export const normalizeStudent = (student) => {
  if (!student) return null;

  return {
    id: student.id,
    name: getStudentName(student),
    email: getStudentEmail(student),
    phone: getStudentPhone(student),
    class: getStudentClass(student),
    profileImage: getStudentProfileImage(student),
    createdAt: student.createdAt,
    lastLogin: student.lastLogin,
    // Preserve original data for backward compatibility
    ...student,
  };
};
