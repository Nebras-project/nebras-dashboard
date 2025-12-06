// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { borderColors } from '@theme/colors';
import { useReduxTheme } from '@hooks';
import FilterSearchBar from './FilterSearchBar';

/**
 * TableFilterSearchBar Component
 *
 * Single Responsibility: Reusable search input field for tables with specific border styling
 * Wraps FilterSearchBar with table-specific border styling (rounded top corners, no bottom border)
 */
const TableFilterSearchBar = memo(function TableFilterSearchBar({ sx, ...props }) {
  const { mode } = useReduxTheme();

  return (
    <FilterSearchBar
      {...props}
      sx={{
        bgcolor: 'background.default',
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px 8px 0 0',
          '& fieldset': {
            border: `1px solid ${borderColors[mode]}`,
            borderBottom: 'none',
          },
          '&:hover fieldset': {
            border: `1px solid ${borderColors[mode]}`,
            borderBottom: 'none',
          },
          '&.Mui-focused fieldset': {
            border: `1px solid ${borderColors[mode]}`,
            borderBottom: 'none',
          },
        },
        ...sx,
      }}
    />
  );
});

TableFilterSearchBar.propTypes = {
  sx: PropTypes.object,
};

TableFilterSearchBar.displayName = 'TableFilterSearchBar';

export default TableFilterSearchBar;
