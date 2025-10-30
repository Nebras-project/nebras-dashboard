
import {
  Container,
  Box,
  Typography,
} from '@mui/material';
import { PageLayout } from '@components';

function CompetitionPage() {
  return (
    <PageLayout title="Science Quiz 2025" description={`Competition ID:`} maxWidth="lg">
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
          <Typography variant="body2" sx={{ mt: 1 }}>Content coming soon</Typography>
        </Box>
      </Container>
    </PageLayout>
  );
}

export default CompetitionPage;

