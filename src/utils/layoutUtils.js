/**
 * Layout Utilities
 *
 * Single Responsibility: Determine which pages should display the main layout (sidebar & header)
 */

/**
 * Static protected routes that require authentication and layout
 * @type {string[]}
 */
const PROTECTED_ROUTES = [
  '/dashboard',
  '/students',
  '/competitions',
  '/grades',
  '/admins',
  '/managers',
  '/questions',
  '/settings',
  '/access-denied',
];

/**
 * Regex patterns for dynamic protected routes (routes with parameters)
 * These routes require authentication and layout but have dynamic segments
 * @type {RegExp[]}
 */
const PROTECTED_ROUTE_PATTERNS = [
  /^\/admins\/[^/]+$/, // /admins/:id - Admin details page
  /^\/managers\/[^/]+$/, // /managers/:id - Manager details page
  /^\/students\/[^/]+$/, // /students/:id - Student details page
  /^\/competitions\/[^/]+$/, // /competitions/:id - Competition details page
  /^\/competitions\/[^/]+\/members$/, // /competitions/:id/members - Competition members page
  /^\/competitions\/[^/]+\/exam$/, // /competitions/:id/exam - Competition exam page
  /^\/competitions\/[^/]+\/result$/, // /competitions/:id/result - Competition result page
  /^\/grades\/[^/]+$/, // /grades/:id - Grade details page
  /^\/grades\/[^/]+\/subjects\/[^/]+$/, // /grades/:gradeId/subjects/:subjectId - Subject details page
  /^\/grades\/[^/]+\/subjects\/[^/]+\/units\/[^/]+$/, // /grades/:gradeId/subjects/:subjectId/units/:unitId - Unit details page
  /^\/grades\/[^/]+\/subjects\/[^/]+\/units\/[^/]+\/lessons\/[^/]+$/, // /grades/:gradeId/subjects/:subjectId/units/:unitId/lessons/:lessonId - Lesson details page
  /^\/questions\/[^/]+$/, // /questions/:id - Question details page
];

/**
 * Public pages that should not display the main layout
 * @type {string[]}
 */
const PUBLIC_PAGES = ['/login'];

/**
 * Determines if a page should display the main layout (sidebar & header)
 *
 * @param {string} pathname - The current route pathname
 * @returns {boolean} True if layout should be shown, false otherwise
 *
 * @example
 * shouldShowLayout('/dashboard') // true
 * shouldShowLayout('/admins/123') // true
 * shouldShowLayout('/login') // false
 */
export const shouldShowLayout = (pathname) => {
  // Don't show layout on explicitly public pages
  if (PUBLIC_PAGES.includes(pathname)) {
    return false;
  }

  // Check exact match for protected routes
  const isExactProtectedRoute = PROTECTED_ROUTES.some((route) => route === pathname);
  if (isExactProtectedRoute) {
    return true;
  }

  // Check pattern match for dynamic protected routes
  const isPatternProtectedRoute = PROTECTED_ROUTE_PATTERNS.some((pattern) =>
    pattern.test(pathname)
  );
  if (isPatternProtectedRoute) {
    return true;
  }

  return false;
};

/**
 * Determines if a page is public (should not display layout)
 *
 * @param {string} pathname - The current route pathname
 * @returns {boolean} True if page is public, false otherwise
 *
 * @example
 * isPublicPage('/login') // true
 * isPublicPage('/dashboard') // false
 */
export const isPublicPage = (pathname) => {
  return !shouldShowLayout(pathname);
};
