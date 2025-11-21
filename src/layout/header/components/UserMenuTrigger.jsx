// external imports
import { IconButton, Box } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { UserAvatar, Icon } from '@components';
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

const getArrowIconStyles = (isOpen) => ({
  display: 'flex',
  alignItems: 'center',
  color: 'text.secondary',
  transition: 'transform 0.2s, color 0.2s',
  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
  '&:hover': {
    color: 'primary.main',
  },
});

// Header component constants
const AVATAR_SIZE = 35;

// Arrow icon component that uses menu context
function ArrowIcon() {
  const { open } = useMenuContext();
  return (
    <Box sx={getArrowIconStyles(open)}>
      <Icon name="expandMore" size={20} />
    </Box>
  );
}

function UserMenuTrigger({ user, onClick, ...props }) {
  return (
    <IconButton
      aria-label="user menu"
      sx={AVATAR_BUTTON_STYLES}
      onClick={onClick}
      disableRipple
      {...props}
    >
      <Box sx={AVATAR_CONTAINER_STYLES}>
        <ArrowIcon />
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
