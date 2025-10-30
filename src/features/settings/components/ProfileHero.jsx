import { Box, Paper, Typography, Avatar, Button } from '@mui/material';
import { MdLogout } from 'react-icons/md';
import { useTranslation, useLanguage, useUser } from '@hooks';

function ProfileHero() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const { user, logout } = useUser();

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 4,
        border: 1,
        borderColor: 'divider',
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: { mobile: 'column', tablet: 'row' }, alignItems: { mobile: 'center', tablet: 'flex-start' }, gap: 3 }}>
        <Avatar
          sx={{
            width: { mobile: 100, tablet: 80 },
            height: { mobile: 100, tablet: 80 },
            bgcolor: 'primary.main',
            fontSize: { mobile: '2.5rem', tablet: '2rem' },
            fontWeight: 600,
          }}
        >
          {user?.name?.charAt(0).toUpperCase() || 'U'}
        </Avatar>

        <Box sx={{ flex: 1, textAlign: { mobile: 'center', tablet: 'left' }, width: { mobile: '100%', tablet: 'auto' } }}>
          <Typography variant="h5" fontWeight="600" gutterBottom>
            {user?.name || 'User'}
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              display: 'inline-block',
              px: 1.5,
              py: 0.5,
              mt: 1,
              bgcolor: 'action.hover',
              borderRadius: 1,
              fontWeight: 600,
            }}
          >
            {user?.role ? t(`users.${user.role}`) : t('common.notAvailable')}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', width: { mobile: '100%', tablet: 'auto' } }}>
          <Button 
            variant="outlined" 
            color="error" 
            startIcon={<MdLogout style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />} 
            onClick={logout} 
            fullWidth={true}
            sx={{ 
              textTransform: 'none',
              fontWeight: 500,
              width: { mobile: '100%', tablet: 'auto' },
            }}
          >
            {t('common.logout')}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default ProfileHero;


