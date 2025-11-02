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
  subjects: {
    text: 'navigation.subjects',
    icon: <Icon name="autoStories" />,
    path: '/subjects',
  },
  units: {
    text: 'navigation.units',
    icon: <Icon name="bookmark" />,
    path: '/units',
  },
  // Question Management Dropdown (with children)
  questionsDropdown: {
    text: 'navigation.questionManagement',
    icon: <Icon name="questionAnswer" />,
    children: [
      {
        text: 'navigation.allQuestions',
        icon: <Icon name="selectMultiple" />,
        path: '/questions',
      },
      {
        text: 'navigation.ministerialQuestions',
        icon: <Icon name="gavel" />,
        path: '/questions/ministerial',
      },
      {
        text: 'navigation.enrichmentQuestions',
        icon: <Icon name="lightbulb" />,
        path: '/questions/enrichment',
      },
    ],
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
  menuItems.subjects,
  menuItems.units,
  menuItems.questionsDropdown,
  menuItems.settings,
];

export const navigationItems = {
  owner: fullAccessItems,
  general_admin: fullAccessItems,
  curriculum_manager: [
    menuItems.dashboard,
    menuItems.curriculums,
    menuItems.subjects,
    menuItems.units,
    menuItems.questionsDropdown,
    menuItems.settings,
  ],
  competition_manager: [
    menuItems.dashboard,
    menuItems.competitions,
    menuItems.students,
    menuItems.settings,
  ],
  content_manager: [menuItems.dashboard, menuItems.questionsDropdown, menuItems.settings],
};

export const getNavigationItems = (role) => {
  return navigationItems[role] || navigationItems.owner;
};
