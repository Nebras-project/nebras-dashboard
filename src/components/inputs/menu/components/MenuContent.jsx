import PropTypes from 'prop-types';
import { Menu as MuiMenu, styled } from '@mui/material';

import { borderRadius } from '@theme';
import { margin } from '@constants';

import { useMenuContext } from '../MenuContext';

const StyledMenu = styled(MuiMenu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: borderRadius.sm,
    ...margin.top.sm,
    minWidth: 250,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[3],
  },
}));

function MenuContent({ children, anchorOrigin, transformOrigin, slotProps, sx, ...props }) {
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
      role="menu"
      aria-label={props['aria-label'] || 'Menu'}
      {...menuProps}
      {...props}
    >
      {children}
    </StyledMenu>
  );
}

MenuContent.propTypes = {
  children: PropTypes.node.isRequired,
  anchorOrigin: PropTypes.object,
  transformOrigin: PropTypes.object,
  slotProps: PropTypes.object,
  sx: PropTypes.object,
  'aria-label': PropTypes.string,
};

export default MenuContent;
