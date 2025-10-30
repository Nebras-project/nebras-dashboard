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
  MdSettings,
} from "react-icons/md";
import {BiSolidSelectMultiple} from 'react-icons/bi'
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
    admins: {
    text: "admins.managers",
    icon: <MdManageAccounts />,
    path: "/admins",
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
        icon: <BiSolidSelectMultiple />,
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
  settings: {
    text: "common.settings",
    icon: <MdSettings />,
    path: "/settings",
  },

};

/**
 * Navigation items configuration for different user roles
 * Each role composes its menu from the common menuItems
 */
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
  content_manager: [
    menuItems.dashboard,
    menuItems.questionsDropdown,
    menuItems.settings,
  ],
};

/**
 * Get navigation items for a specific role
 * Falls back to owner role if role not found
 */
export const getNavigationItems = (role) => {
  return navigationItems[role] || navigationItems.owner;
};