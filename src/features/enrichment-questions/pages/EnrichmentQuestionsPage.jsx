import { Container, Box, Typography } from '@mui/material';
import { PageLayout } from '@components';

function EnrichmentQuestionsPage() {

  return (
    <PageLayout title="أسئلة الإثراء / Enrichment Questions" description="Advanced questions for talented and gifted students" maxWidth="lg">
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
          <Typography variant="body2" sx={{ mt: 1 }}>Content coming soon</Typography>
        </Box>
      </Container>
    </PageLayout>
  );
}

export default EnrichmentQuestionsPage;

