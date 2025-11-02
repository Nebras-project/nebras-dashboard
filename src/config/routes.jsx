import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/routing/ProtectedRoute';
import Loader from '../components/feedback/Loader';

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

// Helper to wrap component with Suspense
const withSuspense = (Component) => (
  <Suspense fallback={<Loader variant="page" />}>
    <Component />
  </Suspense>
);

const routes = [
  // Root - Redirect to dashboard
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },

  // Public Routes
  {
    path: '/login',
    element: withSuspense(LoginPage),
  },

  // Protected Routes - Dashboard
  {
    path: '/dashboard',
    element: <ProtectedRoute>{withSuspense(DashboardPage)}</ProtectedRoute>,
  },

  // Protected Routes - Students
  {
    path: '/students',
    element: <ProtectedRoute>{withSuspense(StudentsPage)}</ProtectedRoute>,
  },

  // Protected Routes - Competitions
  {
    path: '/competitions',
    element: <ProtectedRoute>{withSuspense(CompetitionsPage)}</ProtectedRoute>,
  },
  {
    path: '/competitions/:id',
    element: <ProtectedRoute>{withSuspense(CompetitionPage)}</ProtectedRoute>,
  },
  {
    path: '/competitions/:id/members',
    element: <ProtectedRoute>{withSuspense(CompetitionMembersPage)}</ProtectedRoute>,
  },
  {
    path: '/competitions/:id/exam',
    element: <ProtectedRoute>{withSuspense(CompetitionExamPage)}</ProtectedRoute>,
  },
  {
    path: '/competitions/:id/result',
    element: <ProtectedRoute>{withSuspense(CompetitionResultPage)}</ProtectedRoute>,
  },

  // Protected Routes - Curriculums
  {
    path: '/curriculums',
    element: <ProtectedRoute>{withSuspense(CurriculumsPage)}</ProtectedRoute>,
  },

  // Protected Routes - Subjects
  {
    path: '/subjects',
    element: <ProtectedRoute>{withSuspense(SubjectsPage)}</ProtectedRoute>,
  },

  // Protected Routes - Units
  {
    path: '/units',
    element: <ProtectedRoute>{withSuspense(UnitsPage)}</ProtectedRoute>,
  },

  // Protected Routes - Admins
  {
    path: '/admins',
    element: <ProtectedRoute>{withSuspense(AdminsPage)}</ProtectedRoute>,
  },

  // Protected Routes - Questions (Nested Routes)
  {
    path: '/questions',
    element: <ProtectedRoute>{withSuspense(QuestionsPage)}</ProtectedRoute>,
  },
  {
    path: '/questions/ministerial',
    element: <ProtectedRoute>{withSuspense(MinisterialQuestionsPage)}</ProtectedRoute>,
  },
  {
    path: '/questions/enrichment',
    element: <ProtectedRoute>{withSuspense(EnrichmentQuestionsPage)}</ProtectedRoute>,
  },

  // Protected Routes - Settings
  {
    path: '/settings',
    element: <ProtectedRoute>{withSuspense(SettingsPage)}</ProtectedRoute>,
  },

  // 404 - Not Found (must be last)
  {
    path: '*',
    element: withSuspense(NotFoundPage),
  },
];

export default routes;
