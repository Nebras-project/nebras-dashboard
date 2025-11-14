import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { FormProvider } from 'react-hook-form';

import SelectInput from '@components/forms/inputs/SelectInput';

function TablePageSizeSelector({
  formMethods,
  label,
  options,
  show = true,
  align = 'right',
  minWidth = 160,
}) {
  if (!show) return null;

  const justifyContent =
    align === 'center' ? 'center' : align === 'left' ? 'flex-start' : 'flex-end';

  return (
    <FormProvider {...formMethods}>
      <Box sx={{ minWidth, display: 'flex', justifyContent }}>
        <SelectInput
          name="pageSize"
          label={label}
          options={options}
          fullWidth
          margin="none"
          size="small"
        />
      </Box>
    </FormProvider>
  );
}

TablePageSizeSelector.propTypes = {
  formMethods: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.shape({ value: PropTypes.number })])
  ).isRequired,
  show: PropTypes.bool,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  minWidth: PropTypes.number,
};

export default TablePageSizeSelector;
