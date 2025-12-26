/**
 * API Endpoints
 * Centralized endpoint definitions following RESTful conventions
 *
 * RESTful API Conventions:
 * - Use plural nouns for resource names (e.g., /admins, /students)
 * - Use HTTP methods correctly:
 *   - GET: Retrieve resources (list or single)
 *   - POST: Create new resources
 *   - PUT: Full resource replacement
 *   - PATCH: Partial resource update
 *   - DELETE: Remove resources
 * - Use nested resources for relationships (e.g., /curriculums/:id/subjects)
 * - Use query parameters for filtering, sorting, and pagination
 */

export const API_ENDPOINTS = {
  // Authentication
  // Note: Auth endpoints may not strictly follow REST, but are common patterns
  AUTH: {
    LOGIN: '/auth/login_dashboard', // POST - Create session
    VERIFY_EMAIL: '/auth/verify_email', // POST - Verify email
    LOGOUT: '/auth/logout', // POST/DELETE - Destroy session
    REFRESH: '/auth/refresh_access_token', // POST - Refresh session token
    SEND_FORGOT_PASSWORD: '/auth/send_forgot_password', // POST - Forgot password
    SEND_PASSWORD_RESET: '/auth/send_password_reset', // POST - Reset password
    RESET_PASSWORD: '/auth/reset_password', // POST - Reset password
    ME: '/auth/dashboard/me', // GET - Get current authenticated user
  },

  // Admins Resource
  ADMINS: {
    BASE: '/admins',
    BY_ID: (id) => `/admins/${id}`,
  },

  // Roles Resource
  ROLES: {
    BASE: '/roles',
  },

  // Managers Resource
  MANAGERS: {
    BASE: '/managers',
    BY_ID: (id) => `/managers/${id}`,
  },

  // Students Resource
  STUDENTS: {
    BASE: '/students',
    BY_ID: (id) => `/students/${id}`,
  },

  // Competitions Resource
  COMPETITIONS: {
    BASE: '/competitions',
    BY_ID: (id) => `/competitions/${id}`,
    MEMBERS: (id) => `/competitions/${id}/members`,
    EXAM: (id) => `/competitions/${id}/exam`,
    RESULT: (id) => `/competitions/${id}/result`,
    EXAMS: (competitionId) => `/competitions/${competitionId}/exams`,
    EXAM_BY_ID: (competitionId, examId) => `/competitions/${competitionId}/exams/${examId}`,
  },

  // Questions Resource
  QUESTIONS: {
    BASE: '/questions',
    BY_ID: (id) => `/questions/${id}`,
  },

  // Curriculums Resource
  CURRICULUMS: {
    BASE: '/curriculums',
    BY_ID: (id) => `/curriculums/${id}`,

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
};
