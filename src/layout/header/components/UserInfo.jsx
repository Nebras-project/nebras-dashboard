import { Stack, Avatar, Typography } from '@mui/material';
import { fontWeights, lineHeights } from '../../../theme/typography';
import { spacing } from '../../../theme';
import { AVATAR_SIZE } from '../../constants';
import { getRoleDisplayName } from '../headerConfig';
import PropTypes from 'prop-types';

/**
 * UserInfo Component
 * Displays user avatar, name, and role in the header
 */
function UserInfo({ user }) {
  if (!user) {
    return null;
  }

  return (
    <Stack 
      direction="row" 
      spacing={spacing.xxs} 
      alignItems="center"
      justifyContent="end"
      sx={{ flex: 1 }}
    >
      <Avatar 
        sx={{ 
          width: AVATAR_SIZE, 
          height: AVATAR_SIZE,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          fontSize: '1rem'
        }}
      >
        {user.name?.charAt(0).toUpperCase() || 'U'}
      </Avatar>

      <Stack spacing={spacing.none}>
        <Typography 
          variant="body2" 
          sx={{ 
            fontWeight: fontWeights.semiBold, 
            lineHeight: lineHeights.snug 
          }}
        >
          {user.name}
        </Typography>
        <Typography 
          variant="caption" 
          color="text.secondary" 
          sx={{ lineHeight: lineHeights.snug }}
        >
          {getRoleDisplayName(user.role)}
        </Typography>
      </Stack>
    </Stack>
  );
}

UserInfo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
  }),
};

UserInfo.defaultProps = {
  user: null,
};

export default UserInfo;

