// external imports
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { UserAvatar, LogoutButton, Menu } from '@components';
import { margin, padding } from '@constants';
import { getRoleTranslationKey } from '../headerConfig';
import { useTranslation } from '@hooks';
import { fontWeights, borderRadius, borderWidth } from '@theme';
import { baseColors } from '@theme/colors';

// Extract static styles
const AVATAR_BUTTON_STYLES = {
  ...margin.left.auto,
  ...padding.all.xs,
};

// Header component constants (only used in this file)
const AVATAR_SIZE = 35;
const USER_MENU_MIN_WIDTH = 250;

const USER_MENU_PAPER_PROPS = {
  elevation: 3,
  sx: {
    ...margin.top.sm,
    minWidth: USER_MENU_MIN_WIDTH,
    border: borderWidth.xs,
    borderColor: 'divider',
    borderRadius: borderRadius.xxs,
    overflow: 'visible',
  },
};

const MENU_CONTAINER_STYLES = {
  ...padding.x.md,
  ...padding.y.xxs,
};

const NAME_MENU_ITEM_STYLES = {
  ...padding.all.none,
  minHeight: 'auto',
  '&:hover': {
    backgroundColor: 'transparent',
  },
};

const NAME_TYPOGRAPHY_STYLES = {
  cursor: 'pointer',
  '&:hover': {
    color: 'primary.main',
  },
};

const EMAIL_TYPOGRAPHY_STYLES = {
  ...margin.bottom.xs,
};

const ROLE_BADGE_STYLES = {
  display: 'inline-block',
  bgcolor: 'action.hover',
  borderRadius: borderRadius.xxs,
  fontWeight: 600,
  ...padding.y.xxs,
  ...padding.x.md,
};

const DIVIDER_STYLES = {
  borderColor: baseColors.gray700,
  ...margin.top.sm,
};

// Menu transform/anchor origins
const MENU_TRANSFORM_ORIGIN = { horizontal: 'right', vertical: 'top' };
const MENU_ANCHOR_ORIGIN = { horizontal: 'right', vertical: 'bottom' };

function UserInfo({ user = null }) {
  const { t } = useTranslation();

  // Early return if no user data
  if (!user) {
    return null;
  }

  return (
    <Menu id="user-menu">
      {/* Avatar Trigger */}
      <Menu.Trigger>
        <IconButton aria-label="user menu" sx={AVATAR_BUTTON_STYLES}>
          <UserAvatar user={user} size={AVATAR_SIZE} />
        </IconButton>
      </Menu.Trigger>

      {/* Menu Content */}
      <Menu.Content
        transformOrigin={MENU_TRANSFORM_ORIGIN}
        anchorOrigin={MENU_ANCHOR_ORIGIN}
        slotProps={{ paper: USER_MENU_PAPER_PROPS }}
      >
        {/* User Info Section */}
        <Box sx={MENU_CONTAINER_STYLES}>
          {/* User Name - Links to settings page */}
          <Menu.Item component={Link} to="/settings" sx={NAME_MENU_ITEM_STYLES}>
            <Typography
              variant="subtitle1"
              fontWeight={fontWeights.semiBold}
              sx={NAME_TYPOGRAPHY_STYLES}
            >
              {user.name}
            </Typography>
          </Menu.Item>

          {/* User Email */}
          <Typography variant="body2" color="text.secondary" sx={EMAIL_TYPOGRAPHY_STYLES}>
            {user.email}
          </Typography>

          {/* Role Badge */}
          <Typography variant="caption" sx={ROLE_BADGE_STYLES}>
            {t(getRoleTranslationKey(user.role))}
          </Typography>
        </Box>

        {/* Divider */}
        <Menu.Divider sx={DIVIDER_STYLES} />

        {/* Logout Button */}
        <LogoutButton fullWidth />
      </Menu.Content>
    </Menu>
  );
}

UserInfo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  }),
};

// Memoize component - only re-renders when user prop changes
export default memo(UserInfo);
