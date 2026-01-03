// external imports
import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

// internal imports
import { useGrade } from '@features/grades/hooks';
import { useSubjects } from '@features/subjects/hooks';
import { useUnits } from '@features/units/hooks';
import { useLessons } from '@features/lessons/hooks';
import { getQuestionTypeOptions, getQuestionCategoryOptions } from '../../constants';
import { useTranslation } from '@hooks';

/**
 * useQuestionSettingsFields Hook
 *
 * Single Responsibility: Manage form fields logic for question settings
 * Handles fetching curriculums, subjects, units, lessons, building options,
 * and managing cascading field resets
 *
 * @returns {Object} Object containing all options, loading states, and form values
 */
export const useQuestionSettingsFields = () => {
  const { t } = useTranslation();
  const { watch, setValue } = useFormContext();

  // Watch form values for cascading selects
  const gradeId = watch('gradeId');
  const subjectId = watch('subjectId');
  const unitId = watch('unitId');
  const lessonId = watch('lessonId');
  const category = watch('category');

  // Check if category is ministerial (for conditional field display)
  const isMinisterial = category === 'ministerial';

  // Fetch grades
  const { gradeOptions = [], isLoading: isLoadingGrades } = useGrade();

  // Fetch subjects based on curriculum
  const { subjectOptions = [], isLoading: isLoadingSubjects } = useSubjects({
    gradeId: gradeId,
    enabled: !!gradeId,
  });

  // Fetch units based on curriculum and subject
  const { unitOptions, isLoading: isLoadingUnits } = useUnits({
    gradeId: gradeId,
    subjectId: subjectId,
    enabled: !!gradeId && !!subjectId,
  });

  // Fetch lessons based on curriculum, subject, and unit
  const { lessonOptions, isLoading: isLoadingLessons } = useLessons({
    gradeId: gradeId,
    subjectId: subjectId,
    unitId: unitId,
    enabled: !!gradeId && !!subjectId && !!unitId,
  });


  // Get type and category options
  const typeOptions = useMemo(() => getQuestionTypeOptions(t), [t]);
  const categoryOptions = useMemo(() => getQuestionCategoryOptions(t), [t]);

  // Reset dependent fields when parent field changes
  useEffect(() => {
    if (!gradeId) {
      setValue('subjectId', '');
      setValue('unitId', '');
      setValue('lessonId', '');
    }
  }, [gradeId, setValue]);

  useEffect(() => {
    if (!subjectId) {
      setValue('unitId', '');
      setValue('lessonId', '');
    }
  }, [subjectId, setValue]);

  useEffect(() => {
    if (!unitId) {
      setValue('lessonId', '');
    }
  }, [unitId, setValue]);

  return {
    // Form values
    gradeId,
    subjectId,
    unitId,
    lessonId,
    isMinisterial,
    // Options
    gradeOptions,
    subjectOptions,
    unitOptions,
    lessonOptions,
    typeOptions,
    categoryOptions,
    // Loading states
    isLoadingGrades,
    isLoadingSubjects,
    isLoadingUnits,
    isLoadingLessons,
  };
};
