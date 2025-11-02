export const roleTranslationKeys = {
  owner: 'users.owner',
  general_admin: 'users.generalAdmin',
  curriculum_manager: 'users.curriculumManager',
  competition_manager: 'users.competitionManager',
  content_manager: 'users.contentManager',
};

export const getRoleTranslationKey = (role) => {
  return roleTranslationKeys[role] || role;
};
