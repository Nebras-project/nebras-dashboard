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
function QuestionFilter({ onFilterChange, questions = [], actions }) {
  const { t } = useTranslation();

  // Filter state management - filters are sent to backend
  const {
    searchTerm,
    type,
    category,
    lesson,
    curriculum,
    subject,
    unit,
    addedBy,
    hasActiveFilters,
    showFilters,
    filterOptions,
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
  } = useQuestionFilter(onFilterChange, questions);

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
              label={t('questions.filter.category')}
              value={category}
              onChange={setCategory}
              options={filterOptions.categories}
              allLabel={t('questions.filter.allCategories')}
            />

            <FilterSelect
              label={t('questions.filter.curriculum')}
              value={curriculum}
              onChange={setCurriculum}
              options={filterOptions.curriculums}
              allLabel={t('questions.filter.allCurricula')}
            />
            <FilterSelect
              label={t('questions.filter.subject')}
              value={subject}
              onChange={setSubject}
              options={filterOptions.subjects}
              allLabel={t('questions.filter.allSubjects')}
            />

            <FilterSelect
              label={t('questions.filter.unit')}
              value={unit}
              onChange={setUnit}
              options={filterOptions.units}
              allLabel={t('questions.filter.allUnits')}
            />

            <FilterSelect
              label={t('questions.filter.lesson')}
              value={lesson}
              onChange={setLesson}
              options={filterOptions.lessons}
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
