// external imports
import { createContext, useContext, cloneElement, isValidElement, useMemo } from 'react';
import {
  Menu as MuiMenu,
  MenuItem as MuiMenuItem,
  Divider as MuiDivider,
  styled,
} from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { borderRadius, fontWeights } from '@theme';
import { margin, padding } from '@constants';
import { useMenu } from '@hooks';

const MenuContext = createContext(null);

function useMenuContext() {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error('Menu components must be used within a Menu component');
  }

  return context;
}

const StyledMenu = styled(MuiMenu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: borderRadius.sm,
    ...margin.top.sm,
    minWidth: 250,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[3],
  },
}));

const StyledMenuItem = styled(MuiMenuItem)(({ theme }) => ({
  ...padding.x.md,
  ...padding.y.sm,
  minHeight: 40,
  fontWeight: fontWeights.regular,
}));

const StyledDivider = styled(MuiDivider)(({ theme }) => ({
  borderColor: theme.palette.divider,
  ...margin.top.sm,
  ...margin.bottom.sm,
}));

function Menu({ id, children, ...menuProps }) {
  const { anchorEl, open, handleOpen, handleClose } = useMenu();

  // Memoize context value to prevent unnecessary re-renders
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

function Trigger({ children, onClick, ...props }) {
  const { handleOpen } = useMenuContext();

  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }
    handleOpen(event);
  };

  if (isValidElement(children)) {
    return cloneElement(children, { onClick: handleClick, ...props });
  }

  return (
    <span onClick={handleClick} {...props}>
      {children}
    </span>
  );
}

function Content({ children, anchorOrigin, transformOrigin, slotProps, sx, ...props }) {
  const { anchorEl, open, handleClose, id, menuProps } = useMenuContext();

  return (
    <StyledMenu
      id={id}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      slotProps={slotProps}
      sx={sx}
      {...menuProps}
      {...props}
    >
      {children}
    </StyledMenu>
  );
}

function Item({ children, sx, onClick, ...props }) {
  const { handleClose } = useMenuContext();

  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }
    handleClose();
  };

  return (
    <StyledMenuItem sx={sx} onClick={handleClick} {...props}>
      {children}
    </StyledMenuItem>
  );
}

function MenuDivider({ sx, ...props }) {
  return <StyledDivider sx={sx} {...props} />;
}

// Attach subcomponents
Menu.Trigger = Trigger;
Menu.Content = Content;
Menu.Item = Item;
Menu.Divider = MenuDivider;

// PropTypes
Menu.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Trigger.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

Content.propTypes = {
  children: PropTypes.node.isRequired,
  anchorOrigin: PropTypes.object,
  transformOrigin: PropTypes.object,
  slotProps: PropTypes.object,
  sx: PropTypes.object,
};

Item.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
  onClick: PropTypes.func,
  component: PropTypes.elementType,
  to: PropTypes.string,
};

MenuDivider.propTypes = {
  sx: PropTypes.object,
};

export default Menu;
