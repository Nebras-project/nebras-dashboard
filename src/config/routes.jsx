import { Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@components';

// Authentication Pages
import { LoginPage } from '@features/authentication';

// Main Pages
import { DashboardPage } from '@features/dashboard';
import { StudentsPage } from '@features/students';
import { AdminsPage } from '@features/admins';

// Competition Pages
import {
  CompetitionsPage,
  CompetitionPage,
  CompetitionMembersPage,
  CompetitionExamPage,
  CompetitionResultPage,
} from '@features/competitions';

// Curriculum Pages
import { CurriculumsPage } from '@features/curriculums';
import { SubjectsPage } from '@features/subjects';
import { UnitsPage } from '@features/units';

// Question Pages
import { QuestionsPage } from '@features/questions';
import { MinisterialQuestionsPage } from '@features/ministerial-questions';
import { EnrichmentQuestionsPage } from '@features/enrichment-questions';

// Error Pages
import NotFoundPage from '../pages/NotFoundPage';

/**
 * Application Routes Configuration
 * 
 * Route Structure:
 * - Public Routes: Accessible without authentication
 * - Protected Routes: Require authentication (wrapped with ProtectedRoute)
 * - Dynamic Routes: Use URL parameters (e.g., /competitions/:id)
 */
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

  // Protected Routes - Dashboard
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },

  // Protected Routes - Students
  {
    path: '/students',
    element: (
      <ProtectedRoute>
        <StudentsPage />
      </ProtectedRoute>
    ),
  },

  // Protected Routes - Competitions
  {
    path: '/competitions',
    element: (
      <ProtectedRoute>
        <CompetitionsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/competitions/:id',
    element: (
      <ProtectedRoute>
        <CompetitionPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/competitions/:id/members',
    element: (
      <ProtectedRoute>
        <CompetitionMembersPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/competitions/:id/exam',
    element: (
      <ProtectedRoute>
        <CompetitionExamPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/competitions/:id/result',
    element: (
      <ProtectedRoute>
        <CompetitionResultPage />
      </ProtectedRoute>
    ),
  },

  // Protected Routes - Curriculums
  {
    path: '/curriculums',
    element: (
      <ProtectedRoute>
        <CurriculumsPage />
      </ProtectedRoute>
    ),
  },

  // Protected Routes - Subjects
  {
    path: '/subjects',
    element: (
      <ProtectedRoute>
        <SubjectsPage />
      </ProtectedRoute>
    ),
  },

  // Protected Routes - Units
  {
    path: '/units',
    element: (
      <ProtectedRoute>
        <UnitsPage />
      </ProtectedRoute>
    ),
  },

  // Protected Routes - Admins
  {
    path: '/admins',
    element: (
      <ProtectedRoute>
        <AdminsPage />
      </ProtectedRoute>
    ),
  },

  // Protected Routes - Questions (Nested Routes)
  {
    path: '/questions',
    element: (
      <ProtectedRoute>
        <QuestionsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/questions/ministerial',
    element: (
      <ProtectedRoute>
        <MinisterialQuestionsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/questions/enrichment',
    element: (
      <ProtectedRoute>
        <EnrichmentQuestionsPage />
      </ProtectedRoute>
    ),
  },

  // 404 - Not Found (must be last)
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default routes;

