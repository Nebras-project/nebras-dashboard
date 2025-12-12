// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';

// internal imports
import { IconButtonWithTooltip } from '@components';
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
  iconName = 'addToQueue',
  placement = 'top',
  ...iconButtonProps
}) {
  const { t } = useTranslation();
  const tooltipText = tooltip || label || t('common.add');

  return (
    <IconButtonWithTooltip
      iconName={iconName}
      tooltip={tooltipText}
      onClick={onClick}
      color={color}
      placement={placement}
      text={t('common.add')}
      {...iconButtonProps}
    />
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
  placement: PropTypes.string,
  iconName: PropTypes.string,
};

AddIconButton.displayName = 'AddIconButton';

export default AddIconButton;
