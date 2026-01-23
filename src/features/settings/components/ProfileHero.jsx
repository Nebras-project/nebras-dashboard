// external imports
import { Box, Typography } from '@mui/material';

// internal imports
import { Card, UserAvatar, LogoutButton } from '@components';
import { gap, margin, padding } from '@constants';
import { useTranslation, useAuth, useResponsive } from '@hooks';
import { fontWeights, borderRadius } from '@theme';
import { getRoleLabel } from '@utils/roleUtils';

const getContentStyles = () => ({
  ...padding.y.lg,
});

const getContainerStyles = () => ({
  display: 'flex',
  flexDirection: { mobile: 'column', tablet: 'row' },
  alignItems: 'center',
  ...gap.lg,
});

const getAvatarStyles = () => ({
  fontSize: { mobile: '2.5rem', tablet: '2rem' },
});

const getUserInfoStyles = () => ({
  flex: 1,
  textAlign: { mobile: 'center', tablet: 'left' },
  width: { mobile: '100%', tablet: 'auto' },
});

const getRoleBadgeStyles = () => ({
  display: 'inline-block',
  bgcolor: 'action.hover',
  borderRadius: borderRadius.xxs,
  fontWeight: fontWeights.bold,
  ...padding.x.md,
  ...padding.y.xs,
  ...margin.top.xs,
});

function ProfileHero() {
  const { t } = useTranslation();
  const { userId, userName, email, profileImage, role } = useAuth();
  const { isSmallScreen } = useResponsive();

  // Create user object for UserAvatar component
  const user = userId
    ? {
        id: userId,
        userName: userName,
        email: email,
        role: role,
        profileImage: profileImage,
      }
    : null;

  return (
    <Card contentSx={getContentStyles()} sx={{ backgroundColor: 'background.paper' }}>
      <Box sx={getContainerStyles()}>
        <UserAvatar user={user} size="xlarge" sx={getAvatarStyles()} />

        <Box sx={getUserInfoStyles()}>
          <Typography variant="h5" fontWeight={fontWeights.bold} gutterBottom>
            {userName || email || 'User'}
          </Typography>
          <Typography variant="caption" sx={getRoleBadgeStyles()}>
            {role ? getRoleLabel(role, t) : t('common.notAvailable')}
          </Typography>
        </Box>

        <LogoutButton variant="contained" width={isSmallScreen ? '200' : '150'} />
      </Box>
    </Card>
  );
}

export default ProfileHero;
