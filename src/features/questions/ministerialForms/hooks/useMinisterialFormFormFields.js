// external imports
import { useFormContext } from 'react-hook-form';

// internal imports
import { useGrade } from '@features/grades/hooks';
import { useSubjects } from '@features/subjects/hooks';

/**
 * useMinisterialFormFormFields Hook
 *
 * Single Responsibility: Manage form fields logic for ministerial form
 * Handles fetching grades and subjects, and providing options
 */
export const useMinisterialFormFormFields = () => {
  const { watch } = useFormContext();

  // Watch gradeId to fetch subjects
  const gradeId = watch('gradeId');

  // Fetch grades
  const { gradeOptions = [], isLoading: isLoadingGrades } = useGrade();

  // Fetch subjects based on selected grade
  const { subjectOptions, isLoading: isLoadingSubjects } = useSubjects({
    gradeId,
    enabled: !!gradeId,
  });

  return {
    gradeOptions,
    subjectOptions,
    isLoadingGrades,
    isLoadingSubjects,
    gradeId,
  };
};
