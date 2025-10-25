/**
 * Layout Helper Utilities
 * Determines which pages should display the main layout (sidebar + header)
 */

/**
 * List of protected route prefixes that should show the main layout
 */
const PROTECTED_ROUTES = [
  "/dashboard",
  "/students",
  "/competitions",
  "/curriculums",
  "/subjects",
  "/units",
  "/admins",
  "/questions",
  "/ministerial-questions",
  "/enrichment-questions",
];

/**
 * List of public pages that should NOT show the main layout
 */
const PUBLIC_PAGES = ["/login"];

/**
 * Checks if the current pathname should display the main layout
 * @param {string} pathname - The current route pathname
 * @returns {boolean} - True if layout should be shown, false otherwise
 */
export const shouldShowLayout = (pathname) => {
  // Don't show layout on explicitly public pages
  if (PUBLIC_PAGES.includes(pathname)) {
    return false;
  }

  // Show layout only for protected routes
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  return isProtectedRoute;
};

/**
 * Checks if the current pathname is a public page
 * @param {string} pathname - The current route pathname
 * @returns {boolean} - True if it's a public page, false otherwise
 */
export const isPublicPage = (pathname) => {
  return !shouldShowLayout(pathname);
};
