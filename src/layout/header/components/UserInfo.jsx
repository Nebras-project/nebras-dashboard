// external imports
import { useState } from 'react';
import { Avatar, IconButton, Menu, MenuItem, Typography, Divider, Box, Stack } from '@mui/material';
import { MdLogout } from 'react-icons/md';

// internal imports
import { AVATAR_SIZE, USER_MENU_PAPER_PROPS } from '@constants';
import { getRoleTranslationKey } from '../headerConfig';
import { useTranslation, useUser } from '@hooks';
import PropTypes from 'prop-types';

// Avatar styles
const avatarStyles = {
  width: AVATAR_SIZE,
  height: AVATAR_SIZE,
  bgcolor: 'primary.main',
  color: 'primary.contrastText',
  fontSize: '1rem',
};

/**
 * UserInfo Component
 * Displays user avatar with dropdown menu
 */
function UserInfo({ user = null }) {
  const { t } = useTranslation();
  const { logout } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{ 
          ml: 'auto',
          p: 0.5,
        }}
      >
        <Avatar sx={avatarStyles}>
          {user.name?.charAt(0).toUpperCase() || 'U'}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={USER_MENU_PAPER_PROPS}
      >
        <Box sx={{ px: 2, py: 2 }}>
          <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 0.5 }}>
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            {user.email}
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              display: 'inline-block',
              px: 1,
              py: 0.25,
              bgcolor: 'action.hover',
              borderRadius: 1,
              fontWeight: 600,
            }}
          >
            {t(getRoleTranslationKey(user.role))}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: 'error.main' }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <MdLogout size={20} />
            <Typography variant="body2" fontWeight="500">
              {t('common.logout')}
            </Typography>
          </Stack>
        </MenuItem>
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

