import PropTypes from 'prop-types';
import { Divider as MuiDivider, styled } from '@mui/material';

import { margin } from '@constants';

const StyledDivider = styled(MuiDivider)(({ theme }) => ({
  borderColor: theme.palette.divider,
  ...margin.top.sm,
  ...margin.bottom.sm,
}));

function MenuDivider({ sx, ...props }) {
  return <StyledDivider sx={sx} {...props} />;
}

MenuDivider.propTypes = {
  sx: PropTypes.object,
};

export default MenuDivider;
