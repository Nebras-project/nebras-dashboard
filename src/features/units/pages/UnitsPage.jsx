import { Container, Box, Typography } from '@mui/material';
import { PageLayout } from '@components';
import { useTranslation } from '@hooks';

function UnitsPage() {
  const { t } = useTranslation();
  return (
    <PageLayout title={t('curriculum.units')} description={t('curriculum.unit')} maxWidth="desktop">
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

export default UnitsPage;
