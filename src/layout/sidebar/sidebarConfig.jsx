import { Icon } from '@components';

const menuItems = {
  dashboard: {
    text: 'navigation.dashboard',
    icon: <Icon name="dashboard" />,
    path: '/dashboard',
  },
  admins: {
    text: 'admins.managers',
    icon: <Icon name="manageAccounts" />,
    path: '/admins',
  },
  students: {
    text: 'navigation.students',
    icon: <Icon name="groups" />,
    path: '/students',
  },
  competitions: {
    text: 'navigation.competitions',
    icon: <Icon name="emojiEvents" />,
    path: '/competitions',
  },
  curriculums: {
    text: 'navigation.curriculums',
    icon: <Icon name="school" />,
    path: '/curriculums',
  },
  questions: {
    text: 'navigation.questions',
    icon: <Icon name="questionAnswer" />,
    path: '/questions',
  },
  settings: {
    text: 'common.settings',
    icon: <Icon name="settings" />,
    path: '/settings',
  },
};

const fullAccessItems = [
  menuItems.dashboard,
  menuItems.admins,
  menuItems.students,
  menuItems.competitions,
  menuItems.curriculums,
  menuItems.questions,
  menuItems.settings,
];

export const navigationItems = {
  owner: fullAccessItems,
  generalAdmin: fullAccessItems,
  curriculumManager: [
    menuItems.dashboard,
    menuItems.curriculums,
    menuItems.questions,
    menuItems.settings,
  ],
  competitionManager: [
    menuItems.dashboard,
    menuItems.competitions,
    menuItems.students,
    menuItems.settings,
  ],
  contentManager: [menuItems.dashboard, menuItems.questions, menuItems.settings],
};

export const getNavigationItems = (role) => {
  // Return items for the role, or empty array if role is invalid/undefined
  return (role && navigationItems[role]) ?? [];
};
