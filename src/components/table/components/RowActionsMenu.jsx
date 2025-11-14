import PropTypes from 'prop-types';
import { IconButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material';

import { Icon, Menu } from '@components';

function RowActionsMenu({
  actions = [],
  tooltip,
  iconButtonProps,
  onOpen,
  onAction,
  contentProps,
  menuProps,
}) {
  const visibleActions = actions.filter((action) => !action.hide);

  if (!visibleActions.length) {
    return null;
  }

  const triggerButton = (
    <IconButton size="small" aria-label="Row actions" aria-haspopup="true" {...iconButtonProps}>
      <Icon name="moreVert" size={20} />
    </IconButton>
  );

  const trigger = tooltip ? <Tooltip title={tooltip}>{triggerButton}</Tooltip> : triggerButton;

  return (
    <Menu {...menuProps}>
      <Menu.Trigger onClick={onOpen}>{trigger}</Menu.Trigger>
      <Menu.Content
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        minWidth={180}
        {...contentProps}
      >
        {visibleActions.map(({ label, icon, onClick, disabled, ...itemProps }) => {
          // Check if action is delete based on label (case-insensitive)
          const labelString = typeof label === 'string' ? label.toLowerCase() : '';
          const isDeleteAction =
            labelString.includes('delete') ||
            labelString.includes('حذف') ||
            labelString.includes('مسح') ||
            labelString === 'delete' ||
            labelString === 'حذف';

          return (
            <Menu.Item
              key={label}
              disabled={disabled}
              onClick={(event) => {
                onClick?.(event);
                onAction?.(label, event);
              }}
              {...itemProps}
            >
              {icon ? (
                <ListItemIcon
                  sx={{
                    minWidth: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: (theme) =>
                      isDeleteAction ? theme.palette.error.main : theme.palette.text.secondary,
                  }}
                >
                  {icon}
                </ListItemIcon>
              ) : null}
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  sx: {
                    color: (theme) => (isDeleteAction ? theme.palette.error.main : 'inherit'),
                  },
                }}
              />
            </Menu.Item>
          );
        })}
      </Menu.Content>
    </Menu>
  );
}

RowActionsMenu.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      icon: PropTypes.node,
      onClick: PropTypes.func,
      disabled: PropTypes.bool,
      hide: PropTypes.bool,
    })
  ),
  tooltip: PropTypes.node,
  iconButtonProps: PropTypes.object,
  onOpen: PropTypes.func,
  onAction: PropTypes.func,
  contentProps: PropTypes.object,
  menuProps: PropTypes.object,
};

export default RowActionsMenu;
