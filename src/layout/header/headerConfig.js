/**
 * Header configuration
 * Role display names for the header component
 */
export const roleDisplayNames = {
  owner: "Owner",
  general_admin: "General Admin",
  curriculum_manager: "Curriculum Manager",
  competition_manager: "Competition Manager",
  content_manager: "Content Manager",
};

/**
 * Get role display name
 * Falls back to the role key if not found
 */
export const getRoleDisplayName = (role) => {
  return roleDisplayNames[role] || role;
};
