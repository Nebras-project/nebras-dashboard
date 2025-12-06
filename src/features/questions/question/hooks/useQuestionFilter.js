// external imports
import { useState, useMemo } from 'react';
import { useDebouncedFilter } from '@components';
import { useTranslation } from '@hooks';

// internal imports
import { getQuestionTypeOptions, getQuestionCategoryOptions } from '../../constants';

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
export const useQuestionFilter = (onFilterChange, questions = [], debounceMs = 500) => {
  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);

  // Use debounced filter for all filters (search, type, category, lesson, curriculum, subject, unit, addedBy)
  const { filters, hasActiveFilters, updateFilter, clearAllFilters } = useDebouncedFilter(
    {
      questionName: '',
      type: '',
      category: '',
      lesson: '',
      curriculum: '',
      subject: '',
      unit: '',
      addedBy: '',
    },
    onFilterChange, // This will be called with cleaned params after debounce
    debounceMs
  );

  const searchTerm = filters.questionName || '';
  const type = filters.type || '';
  const category = filters.category || '';
  const lesson = filters.lesson || '';
  const curriculum = filters.curriculum || '';
  const subject = filters.subject || '';
  const unit = filters.unit || '';
  const addedBy = filters.addedBy || '';

  // Predefined options for type and category filters
  const typeOptions = useMemo(() => getQuestionTypeOptions(t), [t]);
  const categoryOptions = useMemo(() => getQuestionCategoryOptions(t), [t]);

  // Get unique values for filter options from questions data
  // Note: In a real app, these might come from a separate API endpoint
  const filterOptions = useMemo(() => {
    if (!questions || questions.length === 0) {
      return {
        types: typeOptions,
        categories: categoryOptions,
        lessons: [],
        curriculums: [],
        subjects: [],
        units: [],
        addedBys: [],
      };
    }

    const lessons = [
      ...new Set(questions.map((q) => q.lesson || q.Lesson || q.lessonName || q.LessonName)),
    ].filter(Boolean);
    const curriculums = [...new Set(questions.map((q) => q.curriculum || q.Curriculum))].filter(
      Boolean
    );
    const subjects = [
      ...new Set(questions.map((q) => q.subject || q.Subject || q.subjectName || q.SubjectName)),
    ].filter(Boolean);
    const units = [
      ...new Set(questions.map((q) => q.unit || q.Unit || q.unitName || q.UnitName)),
    ].filter(Boolean);
    const addedBys = [
      ...new Set(
        questions.map(
          (q) =>
            q.addedBy || q.AddedBy || q.addedByName || q.AddedByName || q.createdBy || q.CreatedBy
        )
      ),
    ].filter(Boolean);

    return {
      types: typeOptions,
      categories: categoryOptions,
      lessons,
      curriculums,
      subjects,
      units,
      addedBys,
    };
  }, [questions, typeOptions, categoryOptions]);

  // Convenience setters
  const setSearchTerm = (value) => updateFilter('questionName', value);
  const setType = (value) => updateFilter('type', value);
  const setCategory = (value) => updateFilter('category', value);
  const setLesson = (value) => updateFilter('lesson', value);
  const setCurriculum = (value) => updateFilter('curriculum', value);
  const setSubject = (value) => updateFilter('subject', value);
  const setUnit = (value) => updateFilter('unit', value);
  const setAddedBy = (value) => updateFilter('addedBy', value);

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
    category,
    lesson,
    curriculum,
    subject,
    unit,
    addedBy,
    // State
    hasActiveFilters,
    showFilters,
    // Filter options
    filterOptions,
    // Handlers
    setSearchTerm,
    setType,
    setCategory,
    setLesson,
    setCurriculum,
    setSubject,
    setUnit,
    setAddedBy,
    handleClearFilters,
    handleToggleFilters,
  };
};
