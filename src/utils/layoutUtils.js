const PROTECTED_ROUTES = [
  '/dashboard',
  '/students',
  '/competitions',
  '/curriculums',
  '/subjects',
  '/units',
  '/admins',
  '/questions',
  '/questions/ministerial',
  '/questions/enrichment',
  '/settings',
];

const PUBLIC_PAGES = ['/login'];

export const shouldShowLayout = (pathname) => {
  // Don't show layout on explicitly public pages
  if (PUBLIC_PAGES.includes(pathname)) {
    return false;
  }

  // Show layout only for protected routes
  const isProtectedRoute = PROTECTED_ROUTES.some((route) => route === pathname);

  return isProtectedRoute;
};

export const isPublicPage = (pathname) => {
  return !shouldShowLayout(pathname);
};
