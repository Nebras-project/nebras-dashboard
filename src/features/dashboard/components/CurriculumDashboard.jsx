import { Container, Typography, Box } from '@mui/material';
import { PageLayout } from '@components';
import { useTranslation } from '@hooks';

function CurriculumDashboard() {
  const { t } = useTranslation();

  return (
    <PageLayout
      title={t('navigation.dashboard')}
      description={t('dashboard.overview')}
      maxWidth="lg"
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Content coming soon
          </Typography>
        </Box>
      </Container>
    </PageLayout>
  );
}

export default CurriculumDashboard;
