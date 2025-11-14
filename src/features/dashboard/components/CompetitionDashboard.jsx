import { Typography, Box, Container } from '@mui/material';
import { PageLayout } from '@components';

function CompetitionDashboard() {
  return (
    <PageLayout title="Competition Dashboard" description="Competition Dashboard" maxWidth="lg">
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
          <Typography variant="body2" sx={{ mt: 1 }}>
            This is the competition dashboard.
          </Typography>
        </Box>
      </Container>
    </PageLayout>
  );
}

export default CompetitionDashboard;
