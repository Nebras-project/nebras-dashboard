
import {
  Container,
  Box,
  Typography,
} from '@mui/material';
import { useTranslation } from '@hooks';
import { PageLayout } from '@components';

function CompetitionsPage() {
  const { t } = useTranslation();



  return (
    <PageLayout title={t('competitions.competitions')} description={t('competitions.competition')} maxWidth="lg">
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
          <Typography variant="h6">Placeholder</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>Content coming soon</Typography>
        </Box>
      </Container>
    </PageLayout>
  );
}

export default CompetitionsPage;

