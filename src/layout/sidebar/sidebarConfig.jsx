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
 * Navigation items configuration for different user roles
 * Each role has its own set of menu items with icons, paths, and translation keys
 * Note: 'text' field is now a translation key (e.g., 'navigation.dashboard')
 */
export const navigationItems = {
  owner: [
    { text: "navigation.dashboard", icon: <TbLayoutDashboardFilled />, path: "/dashboard" },
    { text: "navigation.students", icon: <MdGroups />, path: "/students" },
    { text: "navigation.competitions", icon: <MdEmojiEvents />, path: "/competitions" },
    { text: "navigation.curriculums", icon: <MdSchool />, path: "/curriculums" },
    { text: "navigation.subjects", icon: <MdAutoStories />, path: "/subjects" },
    { text: "navigation.units", icon: <MdBookmark />, path: "/units" },
    { text: "navigation.questions", icon: <MdQuestionAnswer />, path: "/questions" },
    {
      text: "navigation.ministerialQuestions",
      icon: <MdGavel />,
      path: "/ministerial-questions",
    },
    {
      text: "navigation.enrichmentQuestions",
      icon: <MdLightbulb />,
      path: "/enrichment-questions",
    },
    { text: "navigation.admins", icon: <MdManageAccounts />, path: "/admins" },
  ],
  general_admin: [
    { text: "navigation.dashboard", icon: <TbLayoutDashboardFilled />, path: "/dashboard" },
    { text: "navigation.students", icon: <MdGroups />, path: "/students" },
    { text: "navigation.competitions", icon: <MdEmojiEvents />, path: "/competitions" },
    { text: "navigation.curriculums", icon: <MdSchool />, path: "/curriculums" },
    { text: "navigation.subjects", icon: <MdAutoStories />, path: "/subjects" },
    { text: "navigation.units", icon: <MdBookmark />, path: "/units" },
    { text: "navigation.questions", icon: <MdQuestionAnswer />, path: "/questions" },
    {
      text: "navigation.ministerialQuestions",
      icon: <MdGavel />,
      path: "/ministerial-questions",
    },
    {
      text: "navigation.enrichmentQuestions",
      icon: <MdLightbulb />,
      path: "/enrichment-questions",
    },
    { text: "navigation.admins", icon: <MdManageAccounts />, path: "/admins" },
  ],
  curriculum_manager: [
    { text: "navigation.dashboard", icon: <TbLayoutDashboardFilled />, path: "/dashboard" },
    { text: "navigation.curriculums", icon: <MdSchool />, path: "/curriculums" },
    { text: "navigation.subjects", icon: <MdAutoStories />, path: "/subjects" },
    { text: "navigation.units", icon: <MdBookmark />, path: "/units" },
    { text: "navigation.questions", icon: <MdQuestionAnswer />, path: "/questions" },
  ],
  competition_manager: [
    { text: "navigation.dashboard", icon: <TbLayoutDashboardFilled />, path: "/dashboard" },
    { text: "navigation.competitions", icon: <MdEmojiEvents />, path: "/competitions" },
    { text: "navigation.students", icon: <MdGroups />, path: "/students" },
  ],
  content_manager: [
    { text: "navigation.dashboard", icon: <TbLayoutDashboardFilled />, path: "/dashboard" },
    { text: "navigation.questions", icon: <MdQuestionAnswer />, path: "/questions" },
    {
      text: "navigation.ministerialQuestions",
      icon: <MdGavel />,
      path: "/ministerial-questions",
    },
    {
      text: "navigation.enrichmentQuestions",
      icon: <MdLightbulb />,
      path: "/enrichment-questions",
    },
  ],
};

/**
 * Get navigation items for a specific role
 * Falls back to owner role if role not found
 */
export const getNavigationItems = (role) => {
  return navigationItems[role] || navigationItems.owner;
};

