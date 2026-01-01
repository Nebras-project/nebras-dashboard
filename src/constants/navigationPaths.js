/**
 * Navigation Paths
 * Centralized frontend route definitions
 *
 * Note: These are frontend routes (for React Router navigation),
 * not API endpoints. They match the API structure for consistency.
 */

export const NAVIGATION_PATHS = {
  // Public Routes
  LOGIN: '/login',
  ACCESS_DENIED: '/access-denied',

  // Dashboard
  DASHBOARD: '/dashboard',

  // Students
  STUDENTS: {
    BASE: '/students',
    BY_ID: (id) => `/students/${id}`,
  },

  // Admins
  ADMINS: {
    BASE: '/admins',
    BY_ID: (id) => `/admins/${id}`,
  },

  // Managers
  MANAGERS: {
    BASE: '/managers',
    BY_ID: (id) => `/managers/${id}`,
  },

  // Competitions
  COMPETITIONS: {
    BASE: '/competitions',
    BY_ID: (id) => `/competitions/${id}`,
    MEMBERS: (id) => `/competitions/${id}/members`,
    EXAM: (id) => `/competitions/${id}/exam`,
    RESULT: (id) => `/competitions/${id}/result`,
  },

  // Questions
  QUESTIONS: {
    BASE: '/questions',
    BY_ID: (id) => `/questions/${id}`,
  },

  // Grades (Root of the hierarchy)
  // Hierarchy: Grade → Subject → Unit → Lesson
  GRADES: {
    BASE: '/grades',
    BY_ID: (gradeId) => `/grades/${gradeId}`,

    // Nested: Subjects within grade
    SUBJECTS: (gradeId) => `/grades/${gradeId}/subjects`,

    // Nested: Units within subject within grade
    UNITS: (gradeId, subjectId) => `/grades/${gradeId}/subjects/${subjectId}/units`,

    // Nested: Lessons within unit within subject within grade
    LESSONS: (gradeId, subjectId, unitId) =>
      `/grades/${gradeId}/subjects/${subjectId}/units/${unitId}/lessons`,
  },

  // Settings
  SETTINGS: '/settings',
};
