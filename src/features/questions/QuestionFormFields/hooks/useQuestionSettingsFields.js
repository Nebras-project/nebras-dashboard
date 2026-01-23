// external imports
import { useEffect, useMemo, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

// internal imports
import { useGrade } from '@features/grades/hooks';
import { useSubjects } from '@features/subjects/hooks';
import { useUnits } from '@features/units/hooks';
import { useLessons } from '@features/lessons/hooks';
import { getQuestionTypeOptions, getQuestionClassOptions } from '../../question/constants';
import { useTranslation } from '@hooks';
import { useMinisterialForm } from '@features/questions/ministerialForms/hooks';

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

  // Watch form values for cascading selects (declare early to pass into hooks)
  const gradeId = watch('gradeId');
  const subjectId = watch('subjectId');
  const unitId = watch('unitId');
  const classValue = watch('class');

  // Fetch ministerial forms filtered by subject when available
  const { formOptions = [], isLoading: isLoadingForms } = useMinisterialForm({
    subjectId,
    enabled: !!subjectId,
  });

  // Watchers already declared above

  // Track previous values to detect changes
  const prevGradeIdRef = useRef(gradeId);
  const prevSubjectIdRef = useRef(subjectId);
  const prevUnitIdRef = useRef(unitId);

  // Check if class is ministerial (for conditional field display)
  const isMinisterial = classValue === 'Ministerial';

  // Fetch grades
  const { gradeOptions = [], isLoading: isLoadingGrades } = useGrade();

  // Fetch subjects based on selected grade
  const { subjectOptions = [], isLoading: isLoadingSubjects } = useSubjects({
    gradeId,
    enabled: !!gradeId,
  });

  // Fetch units based on selected grade and subject
  const { unitOptions = [], isLoading: isLoadingUnits } = useUnits({
    gradeId,
    subjectId,
    enabled: !!gradeId && !!subjectId,
  });

  // Fetch lessons based on selected grade, subject, and unit
  const { lessonOptions = [], isLoading: isLoadingLessons } = useLessons({
    gradeId,
    subjectId,
    unitId,
    enabled: !!gradeId && !!subjectId && !!unitId,
  });

  // Get type and category options
  const typeOptions = useMemo(() => getQuestionTypeOptions(t), [t]);
  const classOptions = useMemo(() => getQuestionClassOptions(t), [t]);

  // Reset dependent fields when parent field changes
  // When grade changes, reset all dependent fields
  useEffect(() => {
    if (prevGradeIdRef.current !== gradeId && prevGradeIdRef.current !== undefined) {
      setValue('subjectId', '');
      setValue('unitId', '');
      setValue('lessonId', '');
    }
    prevGradeIdRef.current = gradeId;
  }, [gradeId, setValue]);

  // When subject changes, reset unit and lesson
  useEffect(() => {
    if (prevSubjectIdRef.current !== subjectId && prevSubjectIdRef.current !== undefined) {
      setValue('unitId', '');
      setValue('lessonId', '');
    }
    prevSubjectIdRef.current = subjectId;
  }, [subjectId, setValue]);

  // When unit changes, reset lesson
  useEffect(() => {
    if (prevUnitIdRef.current !== unitId && prevUnitIdRef.current !== undefined) {
      setValue('lessonId', '');
    }
    prevUnitIdRef.current = unitId;
  }, [unitId, setValue]);

  return {
    // Form values
    gradeId,
    subjectId,
    unitId,
    isMinisterial,

    // Options for select inputs
    gradeOptions,
    subjectOptions,
    unitOptions,
    lessonOptions,
    typeOptions,
    classOptions,
    formOptions,
    // Loading states for each select
    isLoadingGrades,
    isLoadingSubjects,
    isLoadingUnits,
    isLoadingLessons,
    isLoadingForms,
  };
};
