import { Container, Box, Typography } from '@mui/material';
import { PageLayout } from '@components';

function MinisterialQuestionsPage() {

  return (
    <PageLayout title="الأسئلة الوزارية / Ministerial Questions" description="Official ministerial exam questions archive" maxWidth="lg">
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
          <Typography variant="body2" sx={{ mt: 1 }}>Content coming soon</Typography>
        </Box>
      </Container>
    </PageLayout>
  );
}

export default MinisterialQuestionsPage;

