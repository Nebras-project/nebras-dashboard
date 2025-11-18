/**
 * Axios Configuration
 *
 * Single Responsibility: Centralized axios instance with interceptors
 */

import axios from 'axios';
import { API_URL, API_TIMEOUT } from './env.js';

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
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
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
 * Centralized endpoint definitions
 */
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },

  // Admins
  ADMINS: {
    BASE: '/admins',
    BY_ID: (id) => `/admins/${id}`,
  },

  // Students
  STUDENTS: {
    BASE: '/students',
    BY_ID: (id) => `/students/${id}`,
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

  // Curriculums
  CURRICULUMS: {
    BASE: '/curriculums',
    BY_ID: (id) => `/curriculums/${id}`,
  },

  // Subjects
  SUBJECTS: {
    BASE: '/subjects',
    BY_ID: (id) => `/subjects/${id}`,
  },

  // Units
  UNITS: {
    BASE: '/units',
    BY_ID: (id) => `/units/${id}`,
  },

  // Lessons
  LESSONS: {
    BASE: '/lessons',
    BY_ID: (id) => `/lessons/${id}`,
  },
};

// Export axios instance
export default apiClient;
