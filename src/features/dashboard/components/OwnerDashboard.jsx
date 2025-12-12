import { PageLayout } from '@components';
import { useTranslation } from '@hooks';
import { Box, Typography } from '@mui/material';

function OwnerDashboard() {
  const { t } = useTranslation();

  return (
    <PageLayout
      title={t('navigation.dashboard')}
      description={t('dashboard.overview')}
      maxWidth="desktop"
    >
      <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Content coming soon
        </Typography>
      </Box>
    </PageLayout>
  );
}

export default OwnerDashboard;
