// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { MenuItem, ListItemIcon, ListItemText, Typography } from '@mui/material';

// internal imports
import { Icon } from '@components';
import { useTranslation } from '@hooks';

/**
 * NoOptionsMessage Component
 *
 * Single Responsibility: Display a message when no options are available in a select dropdown
 * Used globally across all select inputs to provide consistent UX
 */
const NoOptionsMessage = memo(function NoOptionsMessage({
  message,
  icon = 'moodEmpty',
  iconSize = 24,
  disabled = true,
  ...menuItemProps
}) {
  const { t } = useTranslation();
  const displayMessage = message ?? t('form.noOptionsAvailable');

  return (
    <MenuItem disabled={disabled} {...menuItemProps}>
      <ListItemIcon sx={{ minWidth: 40 }}>
        <Icon name={icon} size={iconSize} />
      </ListItemIcon>
      <ListItemText>
        <Typography variant="body2">{displayMessage}</Typography>
      </ListItemText>
    </MenuItem>
  );
});

NoOptionsMessage.propTypes = {
  /** Custom message to display (defaults to translation key 'form.noOptionsAvailable') */
  message: PropTypes.string,
  /** Icon name to display */
  icon: PropTypes.string,
  /** Icon size in pixels */
  iconSize: PropTypes.number,
  /** Whether the menu item should be disabled */
  disabled: PropTypes.bool,
};

NoOptionsMessage.displayName = 'NoOptionsMessage';

export default NoOptionsMessage;
