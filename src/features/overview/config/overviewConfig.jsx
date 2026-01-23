import { ROLES } from '@utils/roleUtils';
import { NAVIGATION_PATHS } from '@constants';
import { counterKeyToValue } from '../utils';

// Base overview counters configuration
export const overviewStatistics = {
  admins: {
    icon: 'adminPanel',
    color: 'amber',
    counter: 0,
    counterKey: 'admins',
    text: 'navigation.admins',
    path: NAVIGATION_PATHS.ADMINS.BASE,
  },
  managers: {
    icon: 'manageAccounts',
    color: 'primary',
    counter: 0,
    counterKey: 'managers',
    text: 'navigation.managers',
    path: NAVIGATION_PATHS.MANAGERS.BASE,
  },
  students: {
    icon: 'groups',
    color: 'info',
    counter: 0,
    counterKey: 'students',
    text: 'navigation.students',
    path: NAVIGATION_PATHS.STUDENTS.BASE,
  },
  totalQuestions: {
    icon: 'questionAnswer',
    color: 'info',
    counter: 0,
    counterKey: 'totalQuestions',
    text: 'questions.totalQuestions',
    path: NAVIGATION_PATHS.QUESTIONS.BASE,
  },
  forms: {
    icon: 'fileList',
    color: 'teal',
    counter: 0,
    counterKey: 'forms',
    text: 'ministerialForms.forms',
    path: NAVIGATION_PATHS.FORMS.BASE,
  },
  grades: {
    icon: 'school',
    color: 'indigo',
    counter: 0,
    counterKey: 'grades',
    text: 'navigation.grades',
    path: NAVIGATION_PATHS.GRADES.BASE,
  },
};

// Allowed items per role
export const overviewStatisticsByRole = {
  [ROLES.OWNER]: [
    overviewStatistics.admins,
    overviewStatistics.managers,
    overviewStatistics.students,
    overviewStatistics.totalQuestions,
    overviewStatistics.forms,
    overviewStatistics.grades,
  ],
  [ROLES.GENERAL_ADMIN]: [
    overviewStatistics.managers,
    overviewStatistics.students,
    overviewStatistics.totalQuestions,
    overviewStatistics.forms,
    overviewStatistics.grades,
  ],
  [ROLES.GRADE_MANAGER]: [overviewStatistics.grades, overviewStatistics.students],
  [ROLES.COMPETITION_MANAGER]: [overviewStatistics.students],
  [ROLES.CONTENT_MANAGER]: [overviewStatistics.totalQuestions, overviewStatistics.forms],
};

// Returns counters for the role, optionally overriding the counter value with live data
export const getOverviewStatisticsByRole = (role, counts) => {
  const counters = overviewStatisticsByRole[role] || [];
  const values = counterKeyToValue(counts);

  return counters.map((counter) => ({
    ...counter,
    counter: values[counter.counterKey] ?? counter.counter ?? 0,
  }));
};
