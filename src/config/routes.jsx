import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/routing/ProtectedRoute';
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
const AdminsPage = lazy(() => import('@features/admins').then((m) => ({ default: m.AdminsPage })));

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
const SubjectsPage = lazy(() =>
  import('@features/subjects').then((m) => ({ default: m.SubjectsPage }))
);
const UnitsPage = lazy(() => import('@features/units').then((m) => ({ default: m.UnitsPage })));

// Question Pages
const QuestionsPage = lazy(() =>
  import('@features/questions').then((m) => ({ default: m.QuestionsPage }))
);
const MinisterialQuestionsPage = lazy(() =>
  import('@features/ministerial-questions').then((m) => ({ default: m.MinisterialQuestionsPage }))
);
const EnrichmentQuestionsPage = lazy(() =>
  import('@features/enrichment-questions').then((m) => ({ default: m.EnrichmentQuestionsPage }))
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
      <ProtectedRoute allowedRoles={ALLOWED_ROLES.ALL}>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },

  // Protected Routes - Students (Owner & General Admin only)
  {
    path: '/students',
    element: (
      <ProtectedRoute allowedRoles={ALLOWED_ROLES.OWNER_AND_ADMIN}>
        <StudentsPage />
      </ProtectedRoute>
    ),
  },

  // Protected Routes - Competitions (Owner, General Admin & Competition Manager)
  {
    path: '/competitions',
    element: (
      <ProtectedRoute allowedRoles={ALLOWED_ROLES.COMPETITION}>
        <CompetitionsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/competitions/:id',
    element: (
      <ProtectedRoute allowedRoles={ALLOWED_ROLES.COMPETITION}>
        <CompetitionPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/competitions/:id/members',
    element: (
      <ProtectedRoute allowedRoles={ALLOWED_ROLES.COMPETITION}>
        <CompetitionMembersPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/competitions/:id/exam',
    element: (
      <ProtectedRoute allowedRoles={ALLOWED_ROLES.COMPETITION}>
        <CompetitionExamPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/competitions/:id/result',
    element: (
      <ProtectedRoute allowedRoles={ALLOWED_ROLES.COMPETITION}>
        <CompetitionResultPage />
      </ProtectedRoute>
    ),
  },

  // Protected Routes - Curriculums (Owner, General Admin & Curriculum Manager)
  {
    path: '/curriculums',
    element: (
      <ProtectedRoute allowedRoles={ALLOWED_ROLES.CURRICULUM}>
        <CurriculumsPage />
      </ProtectedRoute>
    ),
  },

  // Protected Routes - Subjects (Owner, General Admin & Curriculum Manager)
  {
    path: '/subjects',
    element: (
      <ProtectedRoute allowedRoles={ALLOWED_ROLES.CURRICULUM}>
        <SubjectsPage />
      </ProtectedRoute>
    ),
  },

  // Protected Routes - Units (Owner, General Admin & Curriculum Manager)
  {
    path: '/units',
    element: (
      <ProtectedRoute allowedRoles={ALLOWED_ROLES.CURRICULUM}>
        <UnitsPage />
      </ProtectedRoute>
    ),
  },

  // Protected Routes - Admins (Owner only)
  {
    path: '/admins',
    element: (
      <ProtectedRoute allowedRoles={ALLOWED_ROLES.OWNER_AND_ADMIN}>
        <AdminsPage />
      </ProtectedRoute>
    ),
  },

  // Protected Routes - Questions (Owner, General Admin & Content Manager)
  {
    path: '/questions',
    element: (
      <ProtectedRoute allowedRoles={ALLOWED_ROLES.QUESTIONS}>
        <QuestionsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/questions/ministerial',
    element: (
      <ProtectedRoute allowedRoles={ALLOWED_ROLES.QUESTIONS}>
        <MinisterialQuestionsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/questions/enrichment',
    element: (
      <ProtectedRoute allowedRoles={ALLOWED_ROLES.QUESTIONS}>
        <EnrichmentQuestionsPage />
      </ProtectedRoute>
    ),
  },

  // Protected Routes - Settings (All authenticated users)
  {
    path: '/settings',
    element: (
      <ProtectedRoute allowedRoles={ALLOWED_ROLES.ALL}>
        <SettingsPage />
      </ProtectedRoute>
    ),
  },

  // Unauthorized Page (Public)
  {
    path: '/unauthorized',
    element: <UnauthorizedPage />,
  },

  // 404 - Not Found (must be last)
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default routes;
