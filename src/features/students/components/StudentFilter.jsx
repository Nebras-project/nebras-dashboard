// external imports
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

// internal imports
import { useTranslation } from '@hooks';
import { TableFilterSearchBar, FilterSelect, FilterContent, Menu } from '@components';
import { useStudentFilter } from '../hooks';
import StudentFilterActions from './StudentFilterActions';

/**
 * StudentFilter Component
 *
 * Single Responsibility: UI composition for student filtering using reusable components
 * Filters are sent to backend via filterParams
 */
function StudentFilter({ onFilterChange, addButton }) {
  const { t } = useTranslation();

  // Filter state management - filters are sent to backend
  const {
    searchTerm,
    grade,
    hasActiveFilters,
    showFilters,
    filterOptions,
    setSearchTerm,
    setGrade,
    handleClearFilters,
    handleToggleFilters,
  } = useStudentFilter(onFilterChange);

  return (
    <Box>
      <Menu id="student-filter-menu">
        {/* use the entire search bar as a menu trigger button */}
        <TableFilterSearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder={t('students.filter.searchPlaceholder')}
          endActions={
            <StudentFilterActions
              showFilters={showFilters}
              onToggleFilters={handleToggleFilters}
              hasActiveFilters={hasActiveFilters}
              onClearFilters={handleClearFilters}
              addButton={addButton}
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
              label={t('students.filter.grade')}
              value={grade}
              onChange={setGrade}
              options={filterOptions.grades}
              allLabel={t('students.filter.allGrades')}
            />
          </FilterContent>
        </Menu.Content>
      </Menu>
    </Box>
  );
}

StudentFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  addButton: PropTypes.node, // Optional: Add button to render in the same row
};

export default StudentFilter;
