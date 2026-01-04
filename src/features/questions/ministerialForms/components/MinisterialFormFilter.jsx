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
function MinisterialFormFilter({ onFilterChange, addButton }) {
  const { t } = useTranslation();

  // Filter state management - filters are sent to backend
  const { year, hasActiveFilters, showFilters, setYear, handleClearFilters, handleToggleFilters } =
    useMinisterialFormFilter(onFilterChange);

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
          addButton={addButton}
          filterButtonWrapper={Menu.Trigger}
        />
        <Menu.Content
          minWidth={300}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Stack direction="column" spacing={2} sx={{ ...padding.all.md }}>
            <FilterSelect
              label={t('ministerialForms.filter.year')}
              value={year}
              onChange={setYear}
              options={[]}
              allLabel={t('ministerialForms.filter.allYears')}
            />
          </Stack>
        </Menu.Content>
      </Menu>
    </Box>
  );
}

MinisterialFormFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  addButton: PropTypes.node,
};

export default MinisterialFormFilter;
