// external imports
import PropTypes from 'prop-types';
import { Box, Stack } from '@mui/material';

// internal imports
import { useTranslation } from '@hooks';
import { FilterSearchBar, FilterSelect, Menu } from '@components';
import { useCompetitionFilter } from '../hooks';
import CompetitionFilterActions from './CompetitionFilterActions';
import { margin, padding } from '@constants';

/**
 * CompetitionFilter Component
 *
 * Single Responsibility: UI composition for competition filtering using reusable components
 * Filters are sent to backend via filterParams
 */
function CompetitionFilter({ onFilterChange, competitions = [], addButton }) {
  const { t } = useTranslation();

  // Filter state management - filters are sent to backend
  const {
    searchTerm,
    status,
    curriculum,
    hasActiveFilters,
    showFilters,
    filterOptions,
    setSearchTerm,
    setStatus,
    setCurriculum,
    handleClearFilters,
    handleToggleFilters,
  } = useCompetitionFilter(onFilterChange, competitions);

  return (
    <Box sx={{ ...margin.y.xxl }}>
      <Menu id="competition-filter-menu">
        <FilterSearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder={t('competitions.filter.searchPlaceholder')}
          endActions={
            <CompetitionFilterActions
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
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Stack direction="column" spacing={2} sx={{ ...padding.all.md }}>
            <FilterSelect
              label={t('competitions.filter.status')}
              value={status}
              onChange={setStatus}
              options={filterOptions.statuses}
              allLabel={t('competitions.filter.allStatuses')}
            />

            <FilterSelect
              label={t('competitions.filter.curriculum')}
              value={curriculum}
              onChange={setCurriculum}
              options={filterOptions.curricula}
              allLabel={t('competitions.filter.allCurricula')}
            />
          </Stack>
        </Menu.Content>
      </Menu>
    </Box>
  );
}

CompetitionFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  competitions: PropTypes.array, // Optional: for extracting filter options
  addButton: PropTypes.node, // Optional: Add button to render in the same row
};

export default CompetitionFilter;
