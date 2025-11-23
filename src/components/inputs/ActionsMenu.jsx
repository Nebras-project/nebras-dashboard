import PropTypes from 'prop-types';
import { isValidElement } from 'react';
import { IconButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material';

import { Icon, Menu, NoAccessIcon } from '@components';
import { useRole } from '@hooks';
import { checkRowActionsPermissions } from '@utils/roleUtils';

function ActionsMenu({
  actions = [],
  tooltip,
  iconButtonProps,
  onOpen,
  onAction,
  contentProps,
  menuProps,
  row,
  checkPermissions = false,
  emptyState,
}) {
  const { isOwner, isGeneralAdmin } = useRole();

  // Default empty state: disabled lock icon with tooltip
  const defaultEmptyState = <NoAccessIcon />;

  const finalEmptyState = emptyState !== undefined ? emptyState : defaultEmptyState;

  // Check if actions should be shown based on permissions
  const shouldShowActions = checkRowActionsPermissions({
    isOwner,
    isGeneralAdmin,
    row,
    checkPermissions,
  });

  // Filter actions: if it's a component, always show; if it's an object, check hide property
  const visibleActions = actions.filter((action) => {
    if (isValidElement(action)) return true;
    return !action.hide;
  });

  if (!visibleActions.length) {
    return finalEmptyState;
  }

  if (!shouldShowActions) {
    return finalEmptyState;
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
        {visibleActions.map((action, index) => {
          // If action is a React component, render it directly
          if (isValidElement(action)) {
            return (
              <Menu.Item key={action.key || index} autoClose={false}>
                {action}
              </Menu.Item>
            );
          }

          // Otherwise, treat it as a regular action object
          const { label, icon, onClick, disabled, ...itemProps } = action;

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
                    color: (theme) => theme.palette.text.secondary,
                  }}
                >
                  {icon}
                </ListItemIcon>
              ) : null}
              <ListItemText primary={label} />
            </Menu.Item>
          );
        })}
      </Menu.Content>
    </Menu>
  );
}

ActionsMenu.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.element, // React component
      PropTypes.shape({
        label: PropTypes.node.isRequired,
        icon: PropTypes.node,
        onClick: PropTypes.func,
        disabled: PropTypes.bool,
        hide: PropTypes.bool,
      }),
    ])
  ),
  tooltip: PropTypes.node,
  iconButtonProps: PropTypes.object,
  onOpen: PropTypes.func,
  onAction: PropTypes.func,
  contentProps: PropTypes.object,
  menuProps: PropTypes.object,
  row: PropTypes.object,
  checkPermissions: PropTypes.bool,
  emptyState: PropTypes.node,
};

export default ActionsMenu;
