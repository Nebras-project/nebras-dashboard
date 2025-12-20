// external imports
import { useState, useMemo } from 'react';

// internal imports
import { useAuth, useRole } from '@hooks';

/**
 * useUpdateProfile Hook
 *
 * Single Responsibility: Manage profile update form state and default values
 *
 * @returns {Object} Form state and handlers
 */
export const useUpdateProfile = () => {
  const { userId, userName, email, userProfile } = useAuth();
  const { isGeneralAdmin, isCurriculumManager, isCompetitionManager, isContentManager } = useRole();

  const [formOpen, setFormOpen] = useState(false);

  // Check if user is a manager (curriculum, competition, or content manager)
  const isManager = isCurriculumManager || isCompetitionManager || isContentManager;

  // Prepare default values for form based on role
  const defaultValues = useMemo(() => {
    // Convert role from camelCase to PascalCase for forms
    let roleForForm = '';
    if (isGeneralAdmin) {
      roleForForm = 'General Admin';
    } else if (isCurriculumManager) {
      roleForForm = 'Curriculum Manager';
    } else if (isCompetitionManager) {
      roleForForm = 'Competition Manager';
    } else if (isContentManager) {
      roleForForm = 'Content Manager';
    }

    return {
      id: userId,
      userName: userName || '',
      email: email || '',
      phoneNumber: '', // Phone number is not stored in auth state
      userProfile: userProfile || null,
      role: roleForForm,
    };
  }, [
    userId,
    userName,
    email,
    userProfile,
    isGeneralAdmin,
    isCurriculumManager,
    isCompetitionManager,
    isContentManager,
  ]);

  const handleEditClick = () => {
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  return {
    defaultValues,
    formOpen,
    isManager,
    handleEditClick,
    handleFormClose,
  };
};
