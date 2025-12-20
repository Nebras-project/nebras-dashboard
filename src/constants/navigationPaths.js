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

  // Curriculums (Root of the hierarchy)
  // Hierarchy: Curriculum → Subject → Unit → Lesson
  CURRICULUMS: {
    BASE: '/curriculums',
    BY_ID: (curriculumId) => `/curriculums/${curriculumId}`,

    // Nested: Subjects within curriculum
    SUBJECTS: (curriculumId) => `/curriculums/${curriculumId}/subjects`,
    SUBJECT: (curriculumId, subjectId) => `/curriculums/${curriculumId}/subjects/${subjectId}`,

    // Nested: Units within subject within curriculum
    UNITS: (curriculumId, subjectId) => `/curriculums/${curriculumId}/subjects/${subjectId}/units`,
    UNIT: (curriculumId, subjectId, unitId) =>
      `/curriculums/${curriculumId}/subjects/${subjectId}/units/${unitId}`,

    // Nested: Lessons within unit within subject within curriculum
    LESSONS: (curriculumId, subjectId, unitId) =>
      `/curriculums/${curriculumId}/subjects/${subjectId}/units/${unitId}/lessons`,
    LESSON: (curriculumId, subjectId, unitId, lessonId) =>
      `/curriculums/${curriculumId}/subjects/${subjectId}/units/${unitId}/lessons/${lessonId}`,
  },

  // Settings
  SETTINGS: '/settings',
};
