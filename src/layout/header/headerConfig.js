export const roleTranslationKeys = {
  owner: 'users.owner',
  generalAdmin: 'users.generalAdmin',
  curriculumManager: 'users.curriculumManager',
  competitionManager: 'users.competitionManager',
  contentManager: 'users.contentManager',
};

export const getRoleTranslationKey = (role) => {
  return roleTranslationKeys[role] || role;
};
