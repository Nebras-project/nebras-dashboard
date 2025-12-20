import { Icon } from '@components';

const menuItems = {
  dashboard: {
    text: 'navigation.dashboard',
    icon: <Icon name="dashboard" />,
    path: '/dashboard',
  },
  admins: {
    text: 'navigation.admins',
    icon: <Icon name="adminPanel" />,
    path: '/admins',
  },
  managers: {
    text: 'navigation.managers',
    icon: <Icon name="manageAccounts" />,
    path: '/managers',
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
  menuItems.managers,
  menuItems.students,
  menuItems.competitions,
  menuItems.curriculums,
  menuItems.questions,
  menuItems.settings,
];

const generalAdminItems = [
  menuItems.dashboard,
  menuItems.managers,
  menuItems.students,
  menuItems.competitions,
  menuItems.curriculums,
  menuItems.questions,
  menuItems.settings,
];

export const navigationItems = {
  owner: fullAccessItems,
  generalAdmin: generalAdminItems,
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
