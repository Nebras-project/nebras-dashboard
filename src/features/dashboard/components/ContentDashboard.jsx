import { Typography, Box, Container } from '@mui/material';
import { PageLayout } from '@components';

function ContentDashboard() {
  return (
    <PageLayout title="Content Dashboard" description="Content Dashboard">
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
          <Typography variant="body2" sx={{ mt: 1 }}>
            This is the content dashboard.
          </Typography>
        </Box>
      </Container>
    </PageLayout>
  );
}

export default ContentDashboard;
