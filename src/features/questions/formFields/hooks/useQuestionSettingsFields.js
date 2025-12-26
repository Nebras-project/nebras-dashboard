// external imports
import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

// internal imports
import { useLanguage } from '@hooks';
import { useGrade } from '@features/grades/hooks';
import { getGradeOptions } from '@features/grades/utils';
import { useSubjects } from '@features/subjects/hooks';
import { getSubjectOptions } from '@features/subjects/utils';
import { useUnits } from '@features/units/hooks';
import { getUnitOptions } from '@features/units/utils';
import { useLessons } from '@features/lessons/hooks';
import { getLessonOptions } from '@features/lessons/utils';
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
  const { currentLanguage } = useLanguage();
  const { watch, setValue } = useFormContext();

  // Watch form values for cascading selects
  const gradeId = watch('gradeId');
  const subjectId = watch('subjectId');
  const unitId = watch('unitId');
  const category = watch('category');

  // Check if category is ministerial (for conditional field display)
  const isMinisterial = category === 'Ministerial';

  // Fetch grades
  const { grades = [], isLoading: isLoadingGrades } = useGrade();
  const gradeOptions = useMemo(
    () =>
      grades.length > 0
        ? getGradeOptions(grades, currentLanguage)
        : [
            { value: 1, label: 'المنهج الأول' },
            { value: 2, label: 'المنهج الثاني' },
            { value: 3, label: 'المنهج الثالث' },
          ],
    [grades, currentLanguage]
  );

  // Fetch subjects based on curriculum
  const { subjects = [], isLoading: isLoadingSubjects } = useSubjects({
    gradeId: gradeId ? Number(gradeId) : undefined,
    enabled: !!gradeId,
  });
  const subjectOptions = useMemo(() => {
    // Show dummy data if no curriculum selected or no real data available
    if (!gradeId || subjects.length === 0) {
      return [
        { value: 1, label: 'الرياضيات' },
        { value: 2, label: 'العلوم' },
        { value: 3, label: 'اللغة العربية' },
        { value: 4, label: 'اللغة الإنجليزية' },
      ];
    }
    return getSubjectOptions(subjects, currentLanguage);
  }, [subjects, currentLanguage, gradeId]);

  // Fetch units based on curriculum and subject
  const { units = [], isLoading: isLoadingUnits } = useUnits({
    gradeId: gradeId ? Number(gradeId) : undefined,
    subjectId: subjectId ? Number(subjectId) : undefined,
    enabled: !!gradeId && !!subjectId,
  });
  const unitOptions = useMemo(() => {
    // Show dummy data if curriculum/subject not selected or no real data available
    if (!gradeId || !subjectId || units.length === 0) {
      return [
        { value: 1, label: 'الوحدة الأولى' },
        { value: 2, label: 'الوحدة الثانية' },
        { value: 3, label: 'الوحدة الثالثة' },
        { value: 4, label: 'الوحدة الرابعة' },
      ];
    }
    return getUnitOptions(units, currentLanguage);
  }, [units, currentLanguage, gradeId, subjectId]);

  // Fetch lessons based on curriculum, subject, and unit
  const { lessons = [], isLoading: isLoadingLessons } = useLessons({
    gradeId: gradeId ? Number(gradeId) : undefined,
    subjectId: subjectId ? Number(subjectId) : undefined,
    unitId: unitId ? Number(unitId) : undefined,
    enabled: !!gradeId && !!subjectId && !!unitId,
  });
  const lessonOptions = useMemo(() => {
    // Show dummy data if curriculum/subject/unit not selected or no real data available
    if (!gradeId || !subjectId || !unitId || lessons.length === 0) {
      return [
        { value: 1, label: 'الدرس الأول' },
        { value: 2, label: 'الدرس الثاني' },
        { value: 3, label: 'الدرس الثالث' },
        { value: 4, label: 'الدرس الرابع' },
        { value: 5, label: 'الدرس الخامس' },
      ];
    }
    return getLessonOptions(lessons, currentLanguage);
  }, [lessons, currentLanguage, gradeId, subjectId, unitId]);

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
