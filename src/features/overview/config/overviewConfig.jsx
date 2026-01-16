import { ROLES } from '@utils/roleUtils';
import { NAVIGATION_PATHS } from '@constants';

// Base overview counters configuration
export const overviewStatistics = {
  admins: {
    icon: 'adminPanel',
    color: 'amber',
    counter: 64,
    counterKey: 'admins',
    text: 'navigation.admins',
    path: NAVIGATION_PATHS.ADMINS.BASE,
  },
  managers: {
    icon: 'manageAccounts',
    color: 'primary',
    counter: 10,
    counterKey: 'managers',
    text: 'navigation.managers',
    path: NAVIGATION_PATHS.MANAGERS.BASE,
  },
  students: {
    icon: 'groups',
    color: 'info',
    counter: 55,
    counterKey: 'students',
    text: 'navigation.students',
    path: NAVIGATION_PATHS.STUDENTS.BASE,
  },

  ministerialQuestions: {
    icon: 'gavel',
    color: 'warning',
    counter: 100,
    counterKey: 'ministerialQuestions',
    text: 'questions.totalMinisterialQuestions',
    path: NAVIGATION_PATHS.QUESTIONS.BASE,
  },
  enrichmentQuestions: {
    icon: 'lightbulb',
    color: 'purple',
    counter: 58,
    counterKey: 'enrichmentQuestions',
    text: 'questions.totalEnrichmentQuestions',
    path: NAVIGATION_PATHS.QUESTIONS.BASE,
  },
  totalQuestions: {
    icon: 'questionAnswer',
    color: 'info',
    counter: 158,
    counterKey: 'totalQuestions',
    text: 'questions.totalQuestions',
    path: NAVIGATION_PATHS.QUESTIONS.BASE,
  },
  forms: {
    icon: 'fileList',
    color: 'teal',
    counter: 14,
    counterKey: 'forms',
    text: 'ministerialForms.forms',
    path: `${NAVIGATION_PATHS.QUESTIONS.BASE}?tab=forms`,
  },
  grades: {
    icon: 'school',
    color: 'indigo',
    counter: 5,
    counterKey: 'grades',
    text: 'navigation.grades',
    path: NAVIGATION_PATHS.GRADES.BASE,
  },
  competitions: {
    icon: 'emojiEvents',
    color: 'pink',
    counter: 11,
    counterKey: 'competitions',
    text: 'navigation.competitions',
    path: NAVIGATION_PATHS.COMPETITIONS.BASE,
  },
};

// Allowed items per role
export const overviewStatisticsByRole = {
  [ROLES.OWNER]: [
    overviewStatistics.admins,
    overviewStatistics.managers,
    overviewStatistics.students,
    overviewStatistics.totalQuestions,
    overviewStatistics.ministerialQuestions,
    overviewStatistics.enrichmentQuestions,
    overviewStatistics.forms,
    overviewStatistics.grades,
    overviewStatistics.competitions,
  ],
  [ROLES.GENERAL_ADMIN]: [
    overviewStatistics.managers,
    overviewStatistics.students,
    overviewStatistics.totalQuestions,
    overviewStatistics.ministerialQuestions,
    overviewStatistics.enrichmentQuestions,
    overviewStatistics.forms,
    overviewStatistics.grades,
    overviewStatistics.competitions,
  ],
  [ROLES.GRADE_MANAGER]: [overviewStatistics.grades, overviewStatistics.students],
  [ROLES.COMPETITION_MANAGER]: [overviewStatistics.competitions, overviewStatistics.students],
  [ROLES.CONTENT_MANAGER]: [
    overviewStatistics.totalQuestions,
    overviewStatistics.ministerialQuestions,
    overviewStatistics.enrichmentQuestions,
    overviewStatistics.forms,
  ],
};

// Helper to get the counters for a given role and optional totals map
export const getOverviewStatisticsByRole = (role) => {
  const counters = overviewStatisticsByRole[role];

  return counters;
};
