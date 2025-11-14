// external imports
import { Avatar } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { useAuth } from '@hooks';
import { fontWeights, fontSizes } from '@theme';

const SIZE_PRESETS = {
  small: {
    width: 32,
    height: 32,
    fontSize: fontSizes.sm,
  },
  medium: {
    width: 40,
    height: 40,
    fontSize: fontSizes.md,
  },
  large: {
    width: 56,
    height: 56,
    fontSize: fontSizes['3xl'],
  },
  xlarge: {
    width: 80,
    height: 80,
    fontSize: fontSizes['4xl'],
  },
};

const getAvatarBaseStyles = () => ({
  bgcolor: 'primary.main',
  color: 'primary.contrastText',
  fontWeight: fontWeights.semiBold,
});

const getSizeStyles = (size) => {
  if (typeof size === 'string' && SIZE_PRESETS[size]) {
    return SIZE_PRESETS[size];
  }
  if (typeof size === 'number') {
    return {
      width: size,
      height: size,
      fontSize: `${size / 40}rem`,
    };
  }
  if (typeof size === 'object') {
    return {
      width: size,
      height: size,
    };
  }
  return SIZE_PRESETS.medium;
};

const getUserInitial = (user, fallback) => {
  const userName = typeof user === 'string' ? user : user?.name;
  return userName?.charAt(0).toUpperCase() || fallback;
};

const getUserImage = (user) => {
  if (!user || typeof user === 'string') return null;
  return user.avatar || user.profileImage || user.image || null;
};

function UserAvatar({ user: propUser, size = 'medium', fallback = 'U', sx = {}, ...rest }) {
  const { user: authUser } = useAuth();
  const user = propUser || authUser;
  const initial = getUserInitial(user, fallback);
  const userName = typeof user === 'string' ? user : user?.name;
  const ariaLabel = userName ? `${userName} avatar` : 'User avatar';
  const userImage = getUserImage(user);
  const hasImage = !!userImage;

  return (
    <Avatar
      src={userImage || undefined}
      sx={{
        ...getSizeStyles(size),
        ...(!hasImage && getAvatarBaseStyles()),
        ...sx,
      }}
      aria-label={ariaLabel}
      {...rest}
    >
      {!hasImage && initial}
    </Avatar>
  );
}

UserAvatar.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
      profileImage: PropTypes.string,
      image: PropTypes.string,
    }),
  ]),
  size: PropTypes.oneOfType([
    PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
    PropTypes.number,
    PropTypes.object, // For responsive sizes
  ]),
  fallback: PropTypes.string,
  sx: PropTypes.object,
};

export default UserAvatar;
