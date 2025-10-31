// external imports
import { Avatar } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { fontWeights, fontSizes } from '@theme';

/**
 * UserAvatar Component
 * A reusable avatar component for displaying user initials
 *
 * @param {object|string} user - User object with name property or name string
 * @param {string|number|object} size - Avatar size: 'small', 'medium', 'large', number, or responsive object
 * @param {string} fallback - Fallback character when no name is available
 * @param {object} sx - Additional MUI sx props
 */
function UserAvatar({ user, size = 'medium', fallback = 'U', sx = {}, ...rest }) {
  // Extract name from user object or use as string
  const userName = typeof user === 'string' ? user : user?.name;

  // Get first letter
  const initial = userName?.charAt(0).toUpperCase() || fallback;

  // Size presets
  const sizePresets = {
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

  // Determine size styles
  const getSizeStyles = () => {
    if (typeof size === 'string' && sizePresets[size]) {
      return sizePresets[size];
    }
    if (typeof size === 'number') {
      return {
        width: size,
        height: size,
        fontSize: `${size / 40}rem`,
      };
    }
    if (typeof size === 'object') {
      // Responsive size object
      return {
        width: size,
        height: size,
      };
    }
    return sizePresets.medium;
  };

  return (
    <Avatar
      sx={{
        ...getSizeStyles(),
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        fontWeight: fontWeights.semiBold,
        ...sx,
      }}
      {...rest}
    >
      {initial}
    </Avatar>
  );
}

UserAvatar.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      name: PropTypes.string,
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
