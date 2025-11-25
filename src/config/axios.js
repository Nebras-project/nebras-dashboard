/**
 * Axios Configuration
 *
 * Single Responsibility: Centralized axios instance with interceptors
 */

import axios from 'axios';
import { API_URL, API_TIMEOUT } from './env.js';
import { NAVIGATION_PATHS } from '@config';

/**
 * Create axios instance with default configuration
 */
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  withCredentials: true, // Include cookies for authentication
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor
 * Modify requests before they are sent
 * Note: Authentication is handled via HttpOnly cookies (withCredentials: true)
 * No need to manually add tokens - cookies are automatically included
 */
apiClient.interceptors.request.use(
  (config) => {
    // Handle FormData - remove Content-Type header to let browser set it
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handle errors globally
 * Note: HttpOnly cookies are automatically managed by the browser
 */
apiClient.interceptors.response.use(
  (response) => {
    // Return data directly (axios wraps it in data property)
    return response.data;
  },
  async (error) => {
    // Handle network errors
    if (!error.response) {
      throw new Error(error.message || 'Network error occurred');
    }

    const { status, data } = error.response;

    // Handle 401 Unauthorized - redirect to login
    // HttpOnly cookies are automatically cleared by browser when expired/invalid
    if (status === 401) {
      // Redirect to login page if not already there
      if (window.location.pathname !== NAVIGATION_PATHS.LOGIN) {
        window.location.href = NAVIGATION_PATHS.LOGIN;
      }
      throw new Error(data?.message || 'Unauthorized - Please login again');
    }

    // Handle 403 Forbidden
    if (status === 403) {
      throw new Error(data?.message || 'Access forbidden');
    }

    // Handle 404 Not Found
    if (status === 404) {
      throw new Error(data?.message || 'Resource not found');
    }

    // Handle 500 Server Error
    if (status >= 500) {
      throw new Error(data?.message || 'Server error occurred');
    }

    // Handle other errors
    throw new Error(data?.message || `Request failed with status ${status}`);
  }
);

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
 * - Use proper HTTP status codes (handled in response interceptor)
 */
export const API_ENDPOINTS = {
  // Authentication
  // Note: Auth endpoints may not strictly follow REST, but are common patterns
  AUTH: {
    LOGIN: '/auth/login', // POST - Create session
    LOGOUT: '/auth/logout', // POST/DELETE - Destroy session
    REFRESH: '/auth/refresh', // POST - Refresh session token
    ME: '/auth/me', // GET - Get current authenticated user
  },

  // Admins Resource
  ADMINS: {
    BASE: '/admins',
    BY_ID: (id) => `/admins/${id}`,
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

// Export axios instance
export default apiClient;
