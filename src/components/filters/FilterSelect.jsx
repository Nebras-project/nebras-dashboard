// external imports
import { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { MenuItem, TextField } from '@mui/material';
import { parseOption } from '@components/forms/utils';
import { useMenuContext } from '@components/inputs/menu/MenuContext';

/**
 * FilterSelect Component
 *
 * Single Responsibility: Reusable Select dropdown for filtering
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
  // Get menu context to close menu on change (if inside a Menu)
  let handleClose = null;
  const menuContext = useMenuContext();
  handleClose = menuContext?.handleClose;

  // Transform options and add "All" option at the beginning
  const selectOptions = useMemo(() => {
    const transformedOptions = options.map(parseOption);
    return [{ value: '', label: allLabel }, ...transformedOptions];
  }, [options, allLabel]);

  const handleChange = (event) => {
    onChange(event.target.value);
    // Close menu if inside a Menu context
    if (handleClose) {
      handleClose();
    }
  };

  return (
    <TextField
      select
      fullWidth={fullWidth}
      label={label}
      value={value || ''}
      onChange={handleChange}
      {...selectProps}
    >
      {selectOptions.map((option) => {
        const { value: optionValue, label: optionLabel } = parseOption(option);
        return (
          <MenuItem key={optionValue} value={optionValue}>
            {optionLabel}
          </MenuItem>
        );
      })}
    </TextField>
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
