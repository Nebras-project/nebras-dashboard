// external imports
import { Box, Typography } from '@mui/material';

// internal imports
import { Card, UserAvatar, LogoutButton } from '@components';
import { gap, margin, padding } from '@constants';
import { useTranslation, useUser } from '@hooks';
import { fontWeights, borderRadius } from '@theme';

function ProfileHero() {
  const { t } = useTranslation();
  const { user } = useUser();

  return (
    <Card hoverable contentSx={{ ...padding.top.none }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { mobile: 'column', tablet: 'row' },
          alignItems: { mobile: 'center', tablet: 'flex-start' },
          ...gap.lg,
        }}
      >
        <UserAvatar
          user={user}
          size={{ mobile: 100, tablet: 80 }}
          sx={{
            fontSize: { mobile: '2.5rem', tablet: '2rem' },
          }}
        />

        <Box
          sx={{
            flex: 1,
            textAlign: { mobile: 'center', tablet: 'left' },
            width: { mobile: '100%', tablet: 'auto' },
          }}
        >
          <Typography variant="h5" fontWeight={fontWeights.bold} gutterBottom>
            {user?.name || 'User'}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              display: 'inline-block',
              bgcolor: 'action.hover',
              borderRadius: borderRadius.xxs,
              fontWeight: fontWeights.bold,
              ...padding.x.md,
              ...padding.y.xs,
              ...margin.top.xs,
            }}
          >
            {user?.role ? t(`users.${user.role}`) : t('common.notAvailable')}
          </Typography>
        </Box>

        <LogoutButton variant="outlined" width="200" />
      </Box>
    </Card>
  );
}

export default ProfileHero;
