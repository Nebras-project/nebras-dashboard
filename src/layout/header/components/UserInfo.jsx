import { Stack, Avatar, Typography } from '@mui/material';
import { fontWeights, lineHeights } from '../../../theme/typography';
import { spacing } from '../../../theme';
import { AVATAR_SIZE } from '../../constants';
import { getRoleTranslationKey } from '../headerConfig';
import { useTranslation } from '../../../i18n/hooks/useTranslation';
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
 * Displays user avatar, name, and role in the header
 */
function UserInfo({ user = null }) {
  const { t } = useTranslation();

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
      <Avatar sx={avatarStyles}>
        {user.name?.charAt(0).toUpperCase() || 'U'}
      </Avatar>

      <Stack spacing={spacing.none}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: fontWeights.semiBold,
            lineHeight: lineHeights.snug,
          }}
        >
          {user.name}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ lineHeight: lineHeights.snug }}
        >
          {t(getRoleTranslationKey(user.role))}
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

export default UserInfo;

