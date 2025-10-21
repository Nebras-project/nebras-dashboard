import { Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

// Authentication Pages
import LoginPage from '../features/authentication/pages/LoginPage';

// Main Pages
import DashboardPage from '../features/dashboard/pages/DashboardPage';
import StudentsPage from '../features/students/pages/StudentsPage';
import AdminsPage from '../features/admins/pages/AdminsPage';

// Competition Pages
import CompetitionsPage from '../features/competitions/pages/CompetitionsPage';
import CompetitionPage from '../features/competitions/pages/CompetitionPage';
import CompetitionMembersPage from '../features/competitions/pages/CompetitionMembersPage';
import CompetitionExamPage from '../features/competitions/pages/CompetitionExamPage';
import CompetitionResultPage from '../features/competitions/pages/CompetitionResultPage';

// Curriculum Pages
import CurriculumsPage from '../features/curriculums/pages/CurriculumsPage';
import SubjectsPage from '../features/subjects/pages/SubjectsPage';
import UnitsPage from '../features/units/pages/UnitsPage';

// Question Pages
import QuestionsPage from '../features/questions/pages/QuestionsPage';
import MinisterialQuestionsPage from '../features/ministerial-questions/pages/MinisterialQuestionsPage';
import EnrichmentQuestionsPage from '../features/enrichment-questions/pages/EnrichmentQuestionsPage';

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

  // Protected Routes - Questions
  {
    path: '/questions',
    element: (
      <ProtectedRoute>
        <QuestionsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/ministerial-questions',
    element: (
      <ProtectedRoute>
        <MinisterialQuestionsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/enrichment-questions',
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

