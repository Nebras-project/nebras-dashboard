// external imports
import { Link } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { LogoutButton, Menu } from '@components';
import { margin, padding } from '@constants';
import { getRoleLabel } from '@utils/roleUtils';
import { useTranslation } from '@hooks';
import { fontWeights, borderRadius, borderWidth } from '@theme';
import { borderColors } from '@theme/colors';
import { useMuiTheme } from '@hooks';

// Header component constants
const USER_MENU_MIN_WIDTH = 250;

const USER_MENU_PAPER_PROPS = {
  elevation: 1,
  sx: {
    ...margin.top.sm,
    minWidth: USER_MENU_MIN_WIDTH,
    border: borderWidth.xs,
    borderColor: 'divider',
    borderRadius: borderRadius.xs,
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

const DIVIDER_STYLES = ({ mode }) => ({
  borderColor: borderColors[mode],
  ...margin.top.sm,
});

// Menu transform/anchor origins
const MENU_TRANSFORM_ORIGIN = { horizontal: 'right', vertical: 'top' };
const MENU_ANCHOR_ORIGIN = { horizontal: 'right', vertical: 'bottom' };

function UserMenuContent({ user }) {
  const { t } = useTranslation();
  const { mode } = useMuiTheme();

  return (
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
          {getRoleLabel(user.role, t)}
        </Typography>
      </Box>

      {/* Divider */}
      <Menu.Divider sx={DIVIDER_STYLES({ mode })} />

      {/* Logout Button */}
      <LogoutButton
        fullWidth
        sx={{ '&:hover': { backgroundColor: 'transparent', transform: 'none' } }}
      />
    </Menu.Content>
  );
}

UserMenuContent.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};

export default UserMenuContent;
