// external imports
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Typography, Divider, Box } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { UserAvatar, LogoutButton } from '@components';
import { AVATAR_SIZE, USER_MENU_PAPER_PROPS, margin, padding } from '@constants';
import { getRoleTranslationKey } from '../headerConfig';
import { useTranslation } from '@hooks';
import { fontWeights, borderRadius } from '@theme';
import { baseColors } from '@theme/colors';
/**
 * UserInfo Component
 * Displays user avatar with dropdown menu
 */
function UserInfo({ user = null }) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          ...margin.left.auto,
          ...padding.all.xs,
        }}
      >
        <UserAvatar user={user} size={AVATAR_SIZE} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{ paper: USER_MENU_PAPER_PROPS }}
      >
        <Box sx={{ ...padding.x.md, ...padding.y.xxs }}>

          <MenuItem
            component={Link}
            to="/settings"
            onClick={handleClose}
            sx={{
              ...padding.all.none,
              minHeight: 'auto',
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight={fontWeights.semiBold}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              {user.name}
            </Typography>
          </MenuItem>

          <Typography variant="body2" color="text.secondary" sx={{ ...margin.bottom.xs }}>
            {user.email}
          </Typography>
          
          <Typography
            variant="caption"
            sx={{
              display: 'inline-block',
              bgcolor: 'action.hover',
              borderRadius: borderRadius.xxs,
              fontWeight: 600,
              ...padding.y.xxs,
              ...padding.x.md,
            }}
          >
            {t(getRoleTranslationKey(user.role))}
          </Typography>
        </Box>

        <Divider sx={{ borderColor: baseColors.gray700, ...margin.top.sm }} />

        <LogoutButton fullWidth={true} onLogout={handleClose} />
        
      </Menu>
    </>
  );
}

UserInfo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  }),
};

export default UserInfo;
