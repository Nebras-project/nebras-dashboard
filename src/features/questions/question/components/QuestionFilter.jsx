// external imports
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

// internal imports
import { useTranslation } from '@hooks';
import { TableFilterSearchBar, FilterSelect, FilterContent, Menu } from '@components';
import { useQuestionFilter } from '../hooks';
import QuestionFilterActions from './QuestionFilterActions';

/**
 * QuestionFilter Component
 *
 * Single Responsibility: UI composition for question filtering using reusable components
 * Filters are sent to backend via filterParams
 */
function QuestionFilter({ onFilterChange, actions }) {
  const { t } = useTranslation();

  // Filter state management - filters are sent to backend
  const {
    searchTerm,
    type,
    classValue,
    lessonId,
    gradeId,
    subjectId,
    unitId,
    formId,
    addedBy,
    hasActiveFilters,
    showFilters,
    filterOptions,
    setSearchTerm,
    setType,
    setClass,
    setLessonId,
    setGradeId,
    setSubjectId,
    setUnitId,
    setFormId,
    setAddedBy,
    isLoadingGrades,
    isLoadingSubjects,
    isLoadingUnits,
    isLoadingLessons,
    isLoadingForms,
    handleClearFilters,
    handleToggleFilters,
  } = useQuestionFilter(onFilterChange);

  return (
    <Box>
      <Menu id="question-filter-menu">
        {/* use the entire search bar as a menu trigger button */}
        <TableFilterSearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder={t('questions.filter.searchPlaceholder')}
          endActions={
            <QuestionFilterActions
              showFilters={showFilters}
              onToggleFilters={handleToggleFilters}
              hasActiveFilters={hasActiveFilters}
              onClearFilters={handleClearFilters}
              actions={actions}
              filterButtonWrapper={Menu.Trigger}
            />
          }
          showClearButton={false}
        />
        <Menu.Content
          minWidth={300}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <FilterContent>
            <FilterSelect
              label={t('questions.filter.type')}
              value={type}
              onChange={setType}
              options={filterOptions.types}
              allLabel={t('questions.filter.allTypes')}
            />

            <FilterSelect
              label={t('questions.filter.class')}
              value={classValue}
              onChange={setClass}
              options={filterOptions.classes}
              allLabel={t('questions.filter.allClasses')}
            />

            <FilterSelect
              label={t('questions.form')}
              value={formId}
              onChange={setFormId}
              options={filterOptions.forms}
              disabled={classValue !== 'Ministerial' || isLoadingForms}
              allLabel={t('questions.filter.allForms')}
            />

            <FilterSelect
              label={t('questions.filter.grade')}
              value={gradeId}
              onChange={setGradeId}
              options={filterOptions.grades}
              disabled={isLoadingGrades}
              allLabel={t('questions.filter.allGrades')}
            />
            <FilterSelect
              label={t('questions.filter.subject')}
              value={subjectId}
              onChange={setSubjectId}
              options={filterOptions.subjects}
              disabled={!gradeId || isLoadingSubjects}
              allLabel={t('questions.filter.allSubjects')}
            />

            <FilterSelect
              label={t('questions.filter.unit')}
              value={unitId}
              onChange={setUnitId}
              options={filterOptions.units}
              disabled={!gradeId || !subjectId || isLoadingUnits}
              allLabel={t('questions.filter.allUnits')}
            />

            <FilterSelect
              label={t('questions.filter.lesson')}
              value={lessonId}
              onChange={setLessonId}
              options={filterOptions.lessons}
              disabled={!gradeId || !subjectId || !unitId || isLoadingLessons}
              allLabel={t('questions.filter.allLessons')}
            />

            <FilterSelect
              label={t('questions.filter.addedBy')}
              value={addedBy}
              onChange={setAddedBy}
              options={filterOptions.addedBys}
              allLabel={t('questions.filter.allAddedBy')}
            />
          </FilterContent>
        </Menu.Content>
      </Menu>
    </Box>
  );
}

QuestionFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  questions: PropTypes.array, // Optional: for extracting filter options
  actions: PropTypes.node, // Optional: Action buttons to render in the same row
};

export default QuestionFilter;
