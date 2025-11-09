import { useMemo } from 'react';
import PropTypes from 'prop-types';

import MenuContext, { useMenuContext } from './MenuContext';
import { MenuContent, MenuDivider, MenuItem, MenuTrigger } from './components';
import useMenu from './hooks/useMenu';

function Menu({ id, children, ...menuProps }) {
  const { anchorEl, open, handleOpen, handleClose } = useMenu();

  const contextValue = useMemo(
    () => ({
      anchorEl,
      open,
      handleOpen,
      handleClose,
      id: id || 'menu',
      menuProps,
    }),
    [anchorEl, open, handleOpen, handleClose, id, menuProps]
  );

  return <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>;
}

Menu.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Menu.Trigger = MenuTrigger;
Menu.Content = MenuContent;
Menu.Item = MenuItem;
Menu.Divider = MenuDivider;

export { MenuTrigger, MenuContent, MenuItem, MenuDivider, useMenuContext, useMenu };
export default Menu;
