// external imports
import { useRef, useEffect } from 'react';
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
  const { watch, setValue } = useFormContext();

  // Watch gradeId to fetch subjects
  const gradeId = watch('gradeId');
  const prevGradeIdRef = useRef(gradeId);

  // Fetch grades
  const { gradeOptions = [], isLoading: isLoadingGrades } = useGrade();

  // Fetch subjects based on selected grade
  const { subjectOptions, isLoading: isLoadingSubjects } = useSubjects({
    gradeId,
    enabled: !!gradeId,
  });

  // Reset subjectId immediately when gradeId changes (using ref to track previous value)
  useEffect(() => {
    // Only reset if gradeId actually changed (not on initial mount)
    if (prevGradeIdRef.current !== undefined && prevGradeIdRef.current !== gradeId) {
      setValue('subjectId', '', { shouldValidate: false, shouldDirty: false });
    }
    prevGradeIdRef.current = gradeId;
  }, [gradeId, setValue]);

  return {
    gradeOptions,
    subjectOptions,
    isLoadingGrades,
    isLoadingSubjects,
    gradeId,
  };
};
