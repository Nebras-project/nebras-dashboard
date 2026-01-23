// external imports
import { Avatar } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { useAuth } from '@hooks';
import { fontWeights, fontSizes } from '@theme';
import { Icon } from '@components';

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

const getIconSize = (size) => {
  if (typeof size === 'string' && SIZE_PRESETS[size]) {
    return SIZE_PRESETS[size].width * 0.7; // Icon is 50% of avatar size
  }
  if (typeof size === 'number') {
    return size * 0.7;
  }
  return SIZE_PRESETS.medium.width * 0.7;
};

const getUserImage = (user) => {
  if (!user || typeof user === 'string') return null;
  return user.profileImage || null;
};

function UserAvatar({
  user: propUser,
  size = 'medium',
  fallback: _fallback = 'U',
  sx = {},
  ...rest
}) {
  const { userId, userName, email, profileImage, role } = useAuth();

  // If propUser is provided, use it; otherwise construct from auth state
  const user =
    propUser ||
    (userId
      ? {
          id: userId,
          name: userName,
          userName: userName,
          email: email,
          role: role,
          profileImage: profileImage,
        }
      : null);

  const displayName = typeof user === 'string' ? user : user?.userName;
  const ariaLabel = displayName ? `${displayName} avatar` : 'User avatar';
  const userImage = getUserImage(user);
  const hasImage = !!userImage;
  const iconSize = getIconSize(size);

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
      {!hasImage && <Icon name="person" size={iconSize} />}
    </Avatar>
  );
}

UserAvatar.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      name: PropTypes.string,
      userName: PropTypes.string,
      avatar: PropTypes.string,
      profileImage: PropTypes.string,
      userProfile: PropTypes.string,
      image: PropTypes.string,
    }),
  ]),
  size: PropTypes.oneOfType([
    PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
    PropTypes.number,
    PropTypes.object, // For responsive sizes
  ]),
  fallback: PropTypes.string, // Deprecated: kept for backward compatibility but no longer used
  sx: PropTypes.object,
};

export default UserAvatar;
