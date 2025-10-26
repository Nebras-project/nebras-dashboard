import {
  MdSchool,
  MdAutoStories,
  MdBookmark,
  MdEmojiEvents,
  MdGroups,
  MdQuestionAnswer,
  MdGavel,
  MdLightbulb,
  MdManageAccounts,
} from "react-icons/md";
import { TbLayoutDashboardFilled } from "react-icons/tb";

/**
 * Common navigation menu items
 * Define each menu item once to avoid duplication
 */
const menuItems = {
  dashboard: {
    text: "navigation.dashboard",
    icon: <TbLayoutDashboardFilled />,
    path: "/dashboard",
  },
  students: {
    text: "navigation.students",
    icon: <MdGroups />,
    path: "/students",
  },
  competitions: {
    text: "navigation.competitions",
    icon: <MdEmojiEvents />,
    path: "/competitions",
  },
  curriculums: {
    text: "navigation.curriculums",
    icon: <MdSchool />,
    path: "/curriculums",
  },
  subjects: {
    text: "navigation.subjects",
    icon: <MdAutoStories />,
    path: "/subjects",
  },
  units: {
    text: "navigation.units",
    icon: <MdBookmark />,
    path: "/units",
  },
  // Question Management Dropdown (with children)
  questionsDropdown: {
    text: "navigation.questionManagement",
    icon: <MdQuestionAnswer />,
    children: [
      {
        text: "navigation.allQuestions",
        icon: <MdQuestionAnswer />,
        path: "/questions",
      },
      {
        text: "navigation.ministerialQuestions",
        icon: <MdGavel />,
        path: "/questions/ministerial",
      },
      {
        text: "navigation.enrichmentQuestions",
        icon: <MdLightbulb />,
        path: "/questions/enrichment",
      },
    ],
  },
  admins: {
    text: "navigation.admins",
    icon: <MdManageAccounts />,
    path: "/admins",
  },
};

/**
 * Navigation items configuration for different user roles
 * Each role composes its menu from the common menuItems
 */
const fullAccessItems = [
  menuItems.dashboard,
  menuItems.students,
  menuItems.competitions,
  menuItems.curriculums,
  menuItems.subjects,
  menuItems.units,
  menuItems.questionsDropdown,
  menuItems.admins,
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
  ],
  competition_manager: [
    menuItems.dashboard,
    menuItems.competitions,
    menuItems.students,
  ],
  content_manager: [
    menuItems.dashboard,
    menuItems.questionsDropdown,
  ],
};

/**
 * Get navigation items for a specific role
 * Falls back to owner role if role not found
 */
export const getNavigationItems = (role) => {
  return navigationItems[role] || navigationItems.owner;
};