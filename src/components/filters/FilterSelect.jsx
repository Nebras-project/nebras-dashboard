// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

/**
 * FilterSelect Component
 *
 * Single Responsibility: Reusable select dropdown for filtering
 */
const FilterSelect = memo(function FilterSelect({
  label,
  value,
  onChange,
  options = [],
  allLabel = 'All',
  fullWidth = true,
  ...selectProps
}) {
  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label={label}
        {...selectProps}
      >
        <MenuItem value="">{allLabel}</MenuItem>
        {options.map((option) => {
          const optionValue = typeof option === 'object' ? option.value : option;
          const optionLabel = typeof option === 'object' ? option.label : option;

          return (
            <MenuItem key={optionValue} value={optionValue}>
              {optionLabel}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
});

FilterSelect.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        label: PropTypes.string.isRequired,
      })
    ),
  ]).isRequired,
  allLabel: PropTypes.string,
  fullWidth: PropTypes.bool,
};

FilterSelect.displayName = 'FilterSelect';

export default FilterSelect;
