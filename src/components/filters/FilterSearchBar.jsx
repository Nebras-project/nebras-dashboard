// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Icon } from '@components';

/**
 * FilterSearchBar Component
 *
 * Single Responsibility: Reusable search input field with optional clear button or end actions
 * Uses TextField directly (standalone, no form context required)
 */
const FilterSearchBar = memo(function FilterSearchBar({
  value,
  onChange,
  onClear,
  placeholder,
  fullWidth = true,
  endActions,
  showClearButton = true,
  ...textFieldProps
}) {
  const handleClear = () => {
    if (onClear) {
      onClear();
    } else {
      onChange('');
    }
  };

  // Determine endAdornment: use endActions prop if provided, otherwise show clear button if value exists
  const endAdornment = endActions ? (
    <InputAdornment position="end">{endActions}</InputAdornment>
  ) : (
    showClearButton &&
    value && (
      <InputAdornment position="end">
        <IconButton size="small" onClick={handleClear} edge="end">
          <Icon name="close" size={20} />
        </IconButton>
      </InputAdornment>
    )
  );

  return (
    <TextField
      fullWidth={fullWidth}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      margin="none"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Icon name="search" size={20} style={{ color: 'inherit' }} />
            </InputAdornment>
          ),
          endAdornment,
        },
      }}
      {...textFieldProps}
    />
  );
});

FilterSearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func,
  placeholder: PropTypes.string,
  fullWidth: PropTypes.bool,
  endActions: PropTypes.node, // Optional: Custom actions to render at the end (replaces clear button)
  showClearButton: PropTypes.bool, // Whether to show the default clear button (ignored if endActions is provided)
};

FilterSearchBar.displayName = 'FilterSearchBar';

export default FilterSearchBar;
