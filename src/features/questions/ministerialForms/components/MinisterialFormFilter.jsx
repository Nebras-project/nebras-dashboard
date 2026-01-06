// external imports
import PropTypes from 'prop-types';
import { Box, Stack } from '@mui/material';

// internal imports
import { useTranslation } from '@hooks';
import { FilterSelect, Menu } from '@components';
import { useMinisterialFormFilter } from '../hooks';
import MinisterialFormFilterActions from './MinisterialFormFilterActions';
import { margin, padding } from '@constants';

/**
 * MinisterialFormFilter Component
 *
 * Single Responsibility: UI composition for ministerial form filtering using reusable components
 * Filters are sent to backend via filterParams
 */
function MinisterialFormFilter({ onFilterChange, actions }) {
  const { t } = useTranslation();

  // Filter state management - filters are sent to backend
  const {
    year,
    gradeId,
    subjectId,
    hasActiveFilters,
    showFilters,
    filterOptions,
    isLoadingGrades,
    isLoadingSubjects,
    isLoadingYears,
    setYear,
    setGradeId,
    setSubjectId,
    handleClearFilters,
    handleToggleFilters,
  } = useMinisterialFormFilter(onFilterChange);

  return (
    <Box
      sx={{ ...margin.y.xxl, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
    >
      <Menu id="ministerial-form-filter-menu">
        <MinisterialFormFilterActions
          showFilters={showFilters}
          onToggleFilters={handleToggleFilters}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={handleClearFilters}
          actions={actions}
          filterButtonWrapper={Menu.Trigger}
        />
        <Menu.Content
          minWidth={300}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Stack direction="column" spacing={2} sx={{ ...padding.all.md }}>
            <FilterSelect
              label={t('grade.grade')}
              value={gradeId}
              onChange={setGradeId}
              options={filterOptions.grades}
              allLabel={t('students.filter.allGrades')}
              loading={isLoadingGrades}
            />

            <FilterSelect
              label={t('grade.subject')}
              value={subjectId}
              onChange={setSubjectId}
              options={filterOptions.subjects}
              allLabel={t('questions.filter.allSubjects')}
              disabled={!gradeId}
              loading={isLoadingSubjects}
            />

            <FilterSelect
              label={t('ministerialForms.filter.year')}
              value={year}
              onChange={setYear}
              options={filterOptions.years}
              allLabel={t('ministerialForms.filter.allYears')}
              loading={isLoadingYears}
            />
          </Stack>
        </Menu.Content>
      </Menu>
    </Box>
  );
}

MinisterialFormFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  actions: PropTypes.node,
  addButton: PropTypes.node, // Deprecated, use actions instead
};

export default MinisterialFormFilter;
