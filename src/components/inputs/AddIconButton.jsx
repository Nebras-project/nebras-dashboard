// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@mui/material';

// internal imports
import Icon from '@components/display/Icon';
import { useTranslation } from '@hooks';

/**
 * AddIconButton Component
 *
 * Single Responsibility: Icon button for adding new items
 */
const AddIconButton = memo(function AddIconButton({
  onClick,
  label,
  tooltip,
  color,
  size = 24,
  iconName = 'addGrid',
  ...iconButtonProps
}) {
  const { t } = useTranslation();
  const tooltipText = tooltip || label || t('common.add');

  return (
    <Tooltip title={tooltipText}>
      <IconButton color={color} onClick={onClick} {...iconButtonProps}>
        <Icon name={iconName} size={size} />
      </IconButton>
    </Tooltip>
  );
});

AddIconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string,
  tooltip: PropTypes.string,
  color: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'error',
    'info',
    'success',
    'warning',
  ]),
  size: PropTypes.number,
  iconName: PropTypes.string,
};

AddIconButton.displayName = 'AddIconButton';

export default AddIconButton;
