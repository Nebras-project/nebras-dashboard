// external imports
import { useState, useMemo } from 'react';
import { useDebouncedFilter } from '@components';
import { useTranslation } from '@hooks';

// internal imports
import { getQuestionTypeOptions, getQuestionClassOptions } from '../constants';
import { useGrade } from '../../../grades/hooks';
import { useSubjects } from '../../../subjects/hooks';
import { useUnits } from '../../../units/hooks';
import { useLessons } from '../../../lessons/hooks';
import { useMinisterialForm } from '../../ministerialForms/hooks/useMinisterialForm';

/**
 * useQuestionFilter Hook
 *
 * Single Responsibility: Question-specific filter state management
 * Uses useDebouncedFilter to handle all filters with debouncing
 * Provides filter params for backend API filtering as query string
 * Manages filter UI state (showFilters) and filter options extraction
 *
 * @param {Function} onFilterChange - Callback when filters change (receives filterParams as query string)
 * @param {Array} questions - Questions data for extracting filter options
 * @param {number} debounceMs - Debounce delay in milliseconds (default: 500)
 * @returns {Object} Filter state and handlers
 */
export const useQuestionFilter = (onFilterChange, debounceMs = 500) => {
  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);

  // Use debounced filter for all filters (search, type, class, lesson, curriculum, subject, unit, addedBy)
  const { filters, hasActiveFilters, updateFilter, clearAllFilters } = useDebouncedFilter(
    {
      Text: '',
      Type: '',
      Class: '',
      LessonId: '',
      GradeId: '',
      SubjectId: '',
      UnitId: '',
      FormId: '',
      AddedBy: '',
    },
    onFilterChange, // This will be called with cleaned params after debounce
    debounceMs
  );

  const searchTerm = filters.Text || '';
  const type = filters.Type || '';
  const classValue = filters.Class || '';
  const lessonId = filters.LessonId || '';
  const gradeId = filters.GradeId || '';
  const subjectId = filters.SubjectId || '';
  const unitId = filters.UnitId || '';
  const formId = filters.FormId || '';
  const addedBy = filters.AddedBy || '';

  const { gradeOptions: grades = [], isLoading: isLoadingGrades } = useGrade();
  const { subjectOptions: subjects = [], isLoading: isLoadingSubjects } = useSubjects({
    gradeId,
    enabled: !!gradeId,
  });
  const { unitOptions: units = [], isLoading: isLoadingUnits } = useUnits({
    gradeId,
    subjectId,
    enabled: !!gradeId && !!subjectId,
  });
  const { lessonOptions: lessons = [], isLoading: isLoadingLessons } = useLessons({
    gradeId,
    subjectId,
    unitId,
    enabled: !!gradeId && !!subjectId && !!unitId,
  });
  const { formOptions: forms = [], isLoading: isLoadingForms } = useMinisterialForm();

  // Predefined options for type and class filters
  const typeOptions = useMemo(() => getQuestionTypeOptions(t), [t]);
  const classOptions = useMemo(() => getQuestionClassOptions(t), [t]);

  // Get unique values for filter options from questions data
  // Note: In a real app, these might come from a separate API endpoint
  const filterOptions = useMemo(() => {
    return {
      types: typeOptions,
      classes: classOptions,
      lessons,
      grades,
      subjects,
      units,
      addedBys: [],
      forms,
    };
  }, [typeOptions, classOptions, lessons, grades, subjects, units, forms]);

  // Convenience setters
  const setSearchTerm = (value) => updateFilter('Text', value);
  const setType = (value) => updateFilter('Type', value);
  const setClass = (value) => {
    updateFilter('Class', value);
    if (value !== 'Ministerial') {
      updateFilter('FormId', '');
    }
  };
  const setLessonId = (value) => updateFilter('LessonId', value);
  const setGradeId = (value) => {
    updateFilter('GradeId', value);
    if (value) {
      updateFilter('SubjectId', '');
      updateFilter('UnitId', '');
      updateFilter('LessonId', '');
    }
  };
  const setSubjectId = (value) => {
    updateFilter('SubjectId', value);
    if (value) {
      updateFilter('UnitId', '');
      updateFilter('LessonId', '');
    }
  };
  const setUnitId = (value) => {
    updateFilter('UnitId', value);
    if (value) {
      updateFilter('LessonId', '');
    }
  };
  const setFormId = (value) => updateFilter('FormId', value);
  const setAddedBy = (value) => updateFilter('AddedBy', value);

  const handleClearFilters = () => {
    clearAllFilters();
  };

  const handleToggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  return {
    // Filter values (for controlled inputs)
    searchTerm,
    type,
    classValue,
    lessonId,
    gradeId,
    subjectId,
    unitId,
    formId,
    addedBy,
    // State
    hasActiveFilters,
    showFilters,
    // Filter options
    filterOptions,
    // Loading flags
    isLoadingGrades,
    isLoadingSubjects,
    isLoadingUnits,
    isLoadingLessons,
    isLoadingForms,
    // Handlers
    setSearchTerm,
    setType,
    setClass,
    setLessonId,
    setGradeId,
    setSubjectId,
    setUnitId,
    setFormId,
    setAddedBy,
    handleClearFilters,
    handleToggleFilters,
  };
};
