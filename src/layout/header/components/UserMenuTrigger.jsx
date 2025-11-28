// external imports
import { IconButton, Box } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { UserAvatar, ExpandIcon } from '@components';
import { useMenuContext } from '@components/inputs/menu';
import { margin, padding, gap } from '@constants';

// Extract static styles
const AVATAR_BUTTON_STYLES = {
  ...margin.left.auto,
  ...padding.all.xs,
  '&:hover': {
    backgroundColor: 'transparent',
  },
  '&:active': {
    backgroundColor: 'transparent',
  },
};

const AVATAR_CONTAINER_STYLES = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  ...gap.xs,
};

// Header component constants
const AVATAR_SIZE = 35;

function UserMenuTrigger({ user, onClick, ...props }) {
  const { open } = useMenuContext();

  return (
    <IconButton
      aria-label="user menu"
      sx={AVATAR_BUTTON_STYLES}
      onClick={onClick}
      disableRipple
      {...props}
    >
      <Box sx={AVATAR_CONTAINER_STYLES}>
        <ExpandIcon isOpen={open} />
        <UserAvatar user={user} size={AVATAR_SIZE} />
      </Box>
    </IconButton>
  );
}

UserMenuTrigger.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
};

export default UserMenuTrigger;
