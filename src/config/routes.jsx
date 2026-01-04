import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthenticatedRoute from '../components/routing/AuthenticatedRoute';
import { ALLOWED_ROLES } from '@utils';
import { NAVIGATION_PATHS } from '@constants/navigationPaths';

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
const ManagersPage = lazy(() =>
  import('@features/managers').then((m) => ({ default: m.ManagersPage }))
);
const ManagerPage = lazy(() =>
  import('@features/managers').then((m) => ({ default: m.ManagerPage }))
);

// Competition Pages
const CompetitionsPage = lazy(() =>
  import('@features/competitions').then((m) => ({ default: m.CompetitionsPage }))
);
const CompetitionPage = lazy(() =>
  import('@features/competitions').then((m) => ({ default: m.CompetitionPage }))
);
const CompetitionParticipantsPage = lazy(() =>
  import('@features/competitions').then((m) => ({ default: m.CompetitionParticipantsPage }))
);
const CompetitionExamPage = lazy(() =>
  import('@features/competitions').then((m) => ({ default: m.CompetitionExamPage }))
);
const CompetitionResultPage = lazy(() =>
  import('@features/competitions').then((m) => ({ default: m.CompetitionResultPage }))
);

// Grade Pages
const GradesPage = lazy(() => import('@features/grades').then((m) => ({ default: m.GradesPage })));
const GradePage = lazy(() => import('@features/grades').then((m) => ({ default: m.GradePage })));

// Question Pages
const QuestionsPage = lazy(() =>
  import('@features/questions').then((m) => ({ default: m.QuestionsPage }))
);
const QuestionPage = lazy(() =>
  import('@features/questions').then((m) => ({ default: m.QuestionPage }))
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
    element: <Navigate to={NAVIGATION_PATHS.DASHBOARD} replace />,
  },

  // Public Routes
  {
    path: NAVIGATION_PATHS.LOGIN,
    element: <LoginPage />,
  },

  // Protected Routes - Dashboard (All authenticated users)
  {
    path: NAVIGATION_PATHS.DASHBOARD,
    element: (
      <AuthenticatedRoute allowedRoles={ALLOWED_ROLES.ALL}>
        <DashboardPage />
      </AuthenticatedRoute>
    ),
  },

  // Protected Routes - Students (Owner & General Admin only)
  {
    path: NAVIGATION_PATHS.STUDENTS.BASE,
    element: (
      <AuthenticatedRoute allowedRoles={ALLOWED_ROLES.OWNER_AND_ADMIN}>
        <StudentsPage />
      </AuthenticatedRoute>
    ),
  },
  {
    path: NAVIGATION_PATHS.STUDENTS.BY_ID(':id'),
    element: (
      <AuthenticatedRoute allowedRoles={ALLOWED_ROLES.OWNER_AND_ADMIN}>
        <StudentPage />
      </AuthenticatedRoute>
    ),
  },

  // Protected Routes - Competitions (Owner, General Admin & Competition Manager)
  {
    path: NAVIGATION_PATHS.COMPETITIONS.BASE,
    element: (
      <AuthenticatedRoute allowedRoles={ALLOWED_ROLES.COMPETITION}>
        <CompetitionsPage />
      </AuthenticatedRoute>
    ),
  },
  {
    path: NAVIGATION_PATHS.COMPETITIONS.BY_ID(':id'),
    element: (
      <AuthenticatedRoute allowedRoles={ALLOWED_ROLES.COMPETITION}>
        <CompetitionPage />
      </AuthenticatedRoute>
    ),
  },
  {
    path: NAVIGATION_PATHS.COMPETITIONS.MEMBERS(':id'),
    element: (
      <AuthenticatedRoute allowedRoles={ALLOWED_ROLES.COMPETITION}>
        <CompetitionParticipantsPage />
      </AuthenticatedRoute>
    ),
  },
  {
    path: NAVIGATION_PATHS.COMPETITIONS.EXAM(':id'),
    element: (
      <AuthenticatedRoute allowedRoles={ALLOWED_ROLES.COMPETITION}>
        <CompetitionExamPage />
      </AuthenticatedRoute>
    ),
  },
  {
    path: NAVIGATION_PATHS.COMPETITIONS.RESULT(':id'),
    element: (
      <AuthenticatedRoute allowedRoles={ALLOWED_ROLES.COMPETITION}>
        <CompetitionResultPage />
      </AuthenticatedRoute>
    ),
  },

  // Protected Routes - Grades (Owner, General Admin & Grade Manager)
  {
    path: NAVIGATION_PATHS.GRADES.BASE,
    element: (
      <AuthenticatedRoute allowedRoles={ALLOWED_ROLES.GRADE}>
        <GradesPage />
      </AuthenticatedRoute>
    ),
  },
  {
    path: NAVIGATION_PATHS.GRADES.BY_ID(':gradeId'),
    element: (
      <AuthenticatedRoute allowedRoles={ALLOWED_ROLES.GRADE}>
        <GradePage />
      </AuthenticatedRoute>
    ),
  },

  // Protected Routes - Admins (Owner only)
  {
    path: NAVIGATION_PATHS.ADMINS.BASE,
    element: (
      <AuthenticatedRoute allowedRoles={ALLOWED_ROLES.OWNER_ONLY}>
        <AdminsPage />
      </AuthenticatedRoute>
    ),
  },
  {
    path: NAVIGATION_PATHS.ADMINS.BY_ID(':id'),
    element: (
      <AuthenticatedRoute allowedRoles={ALLOWED_ROLES.OWNER_ONLY}>
        <AdminPage />
      </AuthenticatedRoute>
    ),
  },

  // Protected Routes - Managers (Owner & General Admin only)
  {
    path: NAVIGATION_PATHS.MANAGERS.BASE,
    element: (
      <AuthenticatedRoute allowedRoles={ALLOWED_ROLES.OWNER_AND_ADMIN}>
        <ManagersPage />
      </AuthenticatedRoute>
    ),
  },
  {
    path: NAVIGATION_PATHS.MANAGERS.BY_ID(':id'),
    element: (
      <AuthenticatedRoute allowedRoles={ALLOWED_ROLES.OWNER_AND_ADMIN}>
        <ManagerPage />
      </AuthenticatedRoute>
    ),
  },

  // Protected Routes - Questions (Owner, General Admin & Content Manager)
  // Note: Ministerial Forms are displayed as a tab within QuestionsPage
  {
    path: NAVIGATION_PATHS.QUESTIONS.BASE,
    element: (
      <AuthenticatedRoute allowedRoles={ALLOWED_ROLES.QUESTIONS}>
        <QuestionsPage />
      </AuthenticatedRoute>
    ),
  },
  {
    path: NAVIGATION_PATHS.QUESTIONS.BY_ID(':id'),
    element: (
      <AuthenticatedRoute allowedRoles={ALLOWED_ROLES.QUESTIONS}>
        <QuestionPage />
      </AuthenticatedRoute>
    ),
  },

  // Protected Routes - Settings (All authenticated users)
  {
    path: NAVIGATION_PATHS.SETTINGS,
    element: (
      <AuthenticatedRoute allowedRoles={ALLOWED_ROLES.ALL}>
        <SettingsPage />
      </AuthenticatedRoute>
    ),
  },

  // Unauthorized Page (Public)
  {
    path: NAVIGATION_PATHS.ACCESS_DENIED,
    element: <UnauthorizedPage />,
  },

  // 404 - Not Found (must be last)
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default routes;
