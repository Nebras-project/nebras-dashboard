import PropTypes from 'prop-types';
import { MenuItem as MuiMenuItem, styled } from '@mui/material';

import { fontWeights } from '@theme';
import { padding } from '@constants';

import { useMenuContext } from '../MenuContext';

const StyledMenuItem = styled(MuiMenuItem)(() => ({
  ...padding.x.md,
  ...padding.y.sm,
  minHeight: 40,
  fontWeight: fontWeights.regular,
}));

function MenuItem({ children, sx, onClick, ...props }) {
  const { handleClose } = useMenuContext();

  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }

    handleClose();
  };

  return (
    <StyledMenuItem sx={sx} onClick={handleClick} role="menuitem" {...props}>
      {children}
    </StyledMenuItem>
  );
}

MenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
  onClick: PropTypes.func,
  component: PropTypes.elementType,
  to: PropTypes.string,
};

export default MenuItem;
