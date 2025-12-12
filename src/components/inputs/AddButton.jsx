// external imports
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import Button from '@components/inputs/Button';
import Icon from '@components/display/Icon';
import { useTranslation } from '@hooks';

function AddButton({ label, onClick, sx = {}, ...props }) {
  const { t } = useTranslation();

  const defaultLabel = label || t('common.add');

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: 2,
        ...sx,
      }}
    >
      <Button
        variant="outlined"
        color="primary"
        startIcon={<Icon name="addToQueue" size={20} />}
        onClick={onClick}
        {...props}
      >
        {defaultLabel}
      </Button>
    </Box>
  );
}

AddButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  sx: PropTypes.object,
};

export default AddButton;
