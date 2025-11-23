import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthenticatedRoute from '../components/routing/AuthenticatedRoute';
import { ALLOWED_ROLES } from '@utils';

// Lazy load pages for code splitting

// Authentication Pages
const LoginPage = lazy(() =>
  import('@features/authentication').then((m) => ({ default: m.LoginPage }))
);

// Main Pages
const DashboardPage = lazy(() =>
  import('@features/dashboard').then((m) => ({ default: m.DashboardPage }))
);
const StudentsPage = lazy(() =>
  import('@features/students').then((m) => ({ default: m.StudentsPage }))
);
const StudentPage = lazy(() =>
  import('@features/students').then((m) => ({ default: m.StudentPage }))
);
const AdminsPage = lazy(() => import('@features/admins').then((m) => ({ default: m.AdminsPage })));
const AdminPage = lazy(() => import('@features/admins').then((m) => ({ default: m.AdminPage })));

// Competition Pages
const CompetitionsPage = lazy(() =>
  import('@features/competitions').then((m) => ({ default: m.CompetitionsPage }))
);
const CompetitionPage = lazy(() =>
  import('@features/competitions').then((m) => ({ default: m.CompetitionPage }))
);
const CompetitionMembersPage = lazy(() =>
  import('@features/competitions').then((m) => ({ default: m.CompetitionMembersPage }))
);
const CompetitionExamPage = lazy(() =>
  import('@features/competitions').then((m) => ({ default: m.CompetitionExamPage }))
);
const CompetitionResultPage = lazy(() =>
  import('@features/competitions').then((m) => ({ default: m.CompetitionResultPage }))
);

// Curriculum Pages
const CurriculumsPage = lazy(() =>
  import('@features/curriculums').then((m) => ({ default: m.CurriculumsPage }))
);
const CurriculumPage = lazy(() =>
  import('@features/curriculums').then((m) => ({ default: m.CurriculumPage }))
);

// Question Pages
const QuestionsPage = lazy(() =>
  import('@features/questions').then((m) => ({ default: m.QuestionsPage }))
);
// Settings Pages
const SettingsPage = lazy(() =>
  import('@features/settings').then((m) => ({ default: m.SettingsPage }))
);

// Error Pages
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const UnauthorizedPage = lazy(() => import('../pages/UnauthorizedPage'));

const routes = [
  // Root - Redirect to dashboard
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },

  // Public Routes
  {
    path: '/login',
    element: <LoginPage />,
  },

  // Protected Routes - Dashboard (All authenticated users)
  {
    path: '/dashboard',
    element: (
      <AuthenticatedRoute allowedRoles={ALLOWED_ROLES.ALL}>
        <DashboardPage />
      </AuthenticatedRoute>
    ),
  },

  // Protected Routes - Students (Owner & General Admin only)
  {
    path: '/students',
    element: (
      <AuthenticatedRoute allowedRoles={ALLOWED_ROLES.OWNER_AND_ADMIN}>
        <StudentsPage />
      </AuthenticatedRoute>
    ),
  },
  {
    path: '/students/:id',
    element: (
      <AuthenticatedRoute allowedRoles={ALLOWED_ROLES.OWNER_AND_ADMIN}>
        <StudentPage />
      </AuthenticatedRoute>
    ),
  },

  // Protected Routes - Competitions (Owner, General Admin & Competition Manager)
  {
    path: '/competitions',
    element: (
      <AuthenticatedRoute allowedRoles={ALLOWED_ROLES.COMPETITION}>
        <CompetitionsPage />
      </AuthenticatedRoute>
    ),
  },
  {
    path: '/competitions/:id',
    element: (
      <AuthenticatedRoute allowedRoles={ALLOWED_ROLES.COMPETITION}>
        <CompetitionPage />
      </AuthenticatedRoute>
    ),
  },
  {
    path: '/competitions/:id/members',
    element: (
      <AuthenticatedRoute allowedRoles={ALLOWED_ROLES.COMPETITION}>
        <CompetitionMembersPage />
      </AuthenticatedRoute>
    ),
  },
  {
    path: '/competitions/:id/exam',
    element: (
      <AuthenticatedRoute allowedRoles={ALLOWED_ROLES.COMPETITION}>
        <CompetitionExamPage />
      </AuthenticatedRoute>
    ),
  },
  {
    path: '/competitions/:id/result',
    element: (
      <AuthenticatedRoute allowedRoles={ALLOWED_ROLES.COMPETITION}>
        <CompetitionResultPage />
      </AuthenticatedRoute>
    ),
  },

  // Protected Routes - Curriculums (Owner, General Admin & Curriculum Manager)
  {
    path: '/curriculums',
    element: (
      <AuthenticatedRoute allowedRoles={ALLOWED_ROLES.CURRICULUM}>
        <CurriculumsPage />
      </AuthenticatedRoute>
    ),
  },
  {
    path: '/curriculums/:id',
    element: (
      <AuthenticatedRoute allowedRoles={ALLOWED_ROLES.CURRICULUM}>
        <CurriculumPage />
      </AuthenticatedRoute>
    ),
  },

  // Protected Routes - Admins (Owner only)
  {
    path: '/admins',
    element: (
      <AuthenticatedRoute allowedRoles={ALLOWED_ROLES.OWNER_AND_ADMIN}>
        <AdminsPage />
      </AuthenticatedRoute>
    ),
  },
  {
    path: '/admins/:id',
    element: (
      <AuthenticatedRoute allowedRoles={ALLOWED_ROLES.OWNER_AND_ADMIN}>
        <AdminPage />
      </AuthenticatedRoute>
    ),
  },

  // Protected Routes - Questions (Owner, General Admin & Content Manager)
  {
    path: '/questions',
    element: (
      <AuthenticatedRoute allowedRoles={ALLOWED_ROLES.QUESTIONS}>
        <QuestionsPage />
      </AuthenticatedRoute>
    ),
  },

  // Protected Routes - Settings (All authenticated users)
  {
    path: '/settings',
    element: (
      <AuthenticatedRoute allowedRoles={ALLOWED_ROLES.ALL}>
        <SettingsPage />
      </AuthenticatedRoute>
    ),
  },

  // Unauthorized Page (Public)
  {
    path: '/access-denied',
    element: <UnauthorizedPage />,
  },

  // 404 - Not Found (must be last)
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default routes;
