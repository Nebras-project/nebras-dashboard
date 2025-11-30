// external imports
import PropTypes from 'prop-types';
import { Box, Grid, Paper, Collapse } from '@mui/material';

// internal imports
import { useTranslation } from '@hooks';
import { FilterSearchBar, FilterSelect } from '@components';
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
    <Paper sx={{ ...padding.all.md, ...margin.bottom.xxl }}>
      <Box sx={{ ...margin.bottom.lg }}>
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
            />
          }
          showClearButton={false}
        />
      </Box>

      <Collapse in={showFilters}>
        <Grid container spacing={2}>
          <Grid size={{ mobile: 12, tablet: 6, desktop: 3 }}>
            <FilterSelect
              label={t('competitions.filter.status')}
              value={status}
              onChange={setStatus}
              options={filterOptions.statuses}
              allLabel={t('competitions.filter.allStatuses')}
            />
          </Grid>

          <Grid size={{ mobile: 12, tablet: 6, desktop: 3 }}>
            <FilterSelect
              label={t('competitions.filter.curriculum')}
              value={curriculum}
              onChange={setCurriculum}
              options={filterOptions.curricula}
              allLabel={t('competitions.filter.allCurricula')}
            />
          </Grid>
        </Grid>
      </Collapse>
    </Paper>
  );
}

CompetitionFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  competitions: PropTypes.array, // Optional: for extracting filter options
  addButton: PropTypes.node, // Optional: Add button to render in the same row
};

export default CompetitionFilter;
