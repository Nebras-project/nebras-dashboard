/**
 * Header configuration
 * Role translation keys for the header component
 */
export const roleTranslationKeys = {
  owner: "users.owner",
  general_admin: "users.generalAdmin",
  curriculum_manager: "users.curriculumManager",
  competition_manager: "users.competitionManager",
  content_manager: "users.contentManager",
};

/**
 * Get role translation key
 * Falls back to the role key if not found
 */
export const getRoleTranslationKey = (role) => {
  return roleTranslationKeys[role] || role;
};
