import {
  MdSpaceDashboard,
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

/**
 * Navigation items configuration for different user roles
 * Each role has its own set of menu items with icons and paths
 */
export const navigationItems = {
  owner: [
    { text: "Dashboard", icon: <MdSpaceDashboard />, path: "/dashboard" },
    { text: "Students", icon: <MdGroups />, path: "/students" },
    { text: "Competitions", icon: <MdEmojiEvents />, path: "/competitions" },
    { text: "Curriculums", icon: <MdSchool />, path: "/curriculums" },
    { text: "Subjects", icon: <MdAutoStories />, path: "/subjects" },
    { text: "Units", icon: <MdBookmark />, path: "/units" },
    { text: "Questions", icon: <MdQuestionAnswer />, path: "/questions" },
    {
      text: "Ministerial Questions",
      icon: <MdGavel />,
      path: "/ministerial-questions",
    },
    {
      text: "Enrichment Questions",
      icon: <MdLightbulb />,
      path: "/enrichment-questions",
    },
    { text: "Admins", icon: <MdManageAccounts />, path: "/admins" },
  ],
  general_admin: [
    { text: "Dashboard", icon: <MdSpaceDashboard />, path: "/dashboard" },
    { text: "Students", icon: <MdGroups />, path: "/students" },
    { text: "Competitions", icon: <MdEmojiEvents />, path: "/competitions" },
    { text: "Curriculums", icon: <MdSchool />, path: "/curriculums" },
    { text: "Subjects", icon: <MdAutoStories />, path: "/subjects" },
    { text: "Units", icon: <MdBookmark />, path: "/units" },
    { text: "Questions", icon: <MdQuestionAnswer />, path: "/questions" },
    {
      text: "Ministerial Questions",
      icon: <MdGavel />,
      path: "/ministerial-questions",
    },
    {
      text: "Enrichment Questions",
      icon: <MdLightbulb />,
      path: "/enrichment-questions",
    },
    { text: "Admins", icon: <MdManageAccounts />, path: "/admins" },
  ],
  curriculum_manager: [
    { text: "Dashboard", icon: <MdSpaceDashboard />, path: "/dashboard" },
    { text: "Curriculums", icon: <MdSchool />, path: "/curriculums" },
    { text: "Subjects", icon: <MdAutoStories />, path: "/subjects" },
    { text: "Units", icon: <MdBookmark />, path: "/units" },
    { text: "Questions", icon: <MdQuestionAnswer />, path: "/questions" },
  ],
  competition_manager: [
    { text: "Dashboard", icon: <MdSpaceDashboard />, path: "/dashboard" },
    { text: "Competitions", icon: <MdEmojiEvents />, path: "/competitions" },
    { text: "Students", icon: <MdGroups />, path: "/students" },
  ],
  content_manager: [
    { text: "Dashboard", icon: <MdSpaceDashboard />, path: "/dashboard" },
    { text: "Questions", icon: <MdQuestionAnswer />, path: "/questions" },
    {
      text: "Ministerial Questions",
      icon: <MdGavel />,
      path: "/ministerial-questions",
    },
    {
      text: "Enrichment Questions",
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

