import {
  Container,
  Box,
  Typography,
} from '@mui/material';
import { PageLayout } from '@components';

function CompetitionExamPage() {
  // Mock exam data
  const exam = {
    title: 'Science Quiz 2025 - Final Exam',
    duration: '60 minutes',
    totalQuestions: 25,
    passingScore: 70,
    difficulty: 'Medium',
  };


  return (
    <PageLayout title="Competition Exam" description={exam.title} maxWidth="lg">
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
          <Typography variant="body2" sx={{ mt: 1 }}>Content coming soon</Typography>
        </Box>
      </Container>
    </PageLayout>
  );
}

export default CompetitionExamPage;

