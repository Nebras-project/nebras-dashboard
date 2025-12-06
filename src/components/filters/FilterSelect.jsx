// external imports
import { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, TextField } from '@mui/material';
import { useTranslation } from '@hooks';
import { parseOption } from '@components/forms/utils';

/**
 * FilterSelect Component
 *
 * Single Responsibility: Reusable ComboBox (Autocomplete) for filtering
 */
const FilterSelect = memo(function FilterSelect({
  label,
  value,
  onChange,
  options = [],
  allLabel = 'All',
  fullWidth = true,
  ...autocompleteProps
}) {
  const { t } = useTranslation();
  // Transform options to Autocomplete format
  const autocompleteOptions = useMemo(() => {
    const transformedOptions = options.map(parseOption);

    // Add "All" option at the beginning
    return [{ value: '', label: allLabel }, ...transformedOptions];
  }, [options, allLabel]);

  // Find the selected option
  const selectedOption = useMemo(() => {
    return autocompleteOptions.find((opt) => opt.value === value) || autocompleteOptions[0];
  }, [autocompleteOptions, value]);

  const handleChange = (event, newValue) => {
    if (newValue) {
      onChange(newValue.value);
    } else {
      // onChange('');
    }
  };

  return (
    <Autocomplete
      fullWidth={fullWidth}
      options={autocompleteOptions}
      value={selectedOption}
      onChange={handleChange}
      getOptionLabel={(option) => option.label || ''}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      noOptionsText={t('common.noOptions')}
      renderInput={(params) => <TextField {...params} label={label} />}
      {...autocompleteProps}
    />
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
