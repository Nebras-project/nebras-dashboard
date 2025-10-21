import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Button,
  Chip,
} from '@mui/material';
import { MdArrowBack, MdAssignment } from 'react-icons/md';

function CompetitionExamPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock exam data
  const exam = {
    title: 'Science Quiz 2025 - Final Exam',
    duration: '60 minutes',
    totalQuestions: 25,
    passingScore: 70,
    difficulty: 'Medium',
  };

  const questions = [
    { id: 1, question: 'What is the chemical symbol for water?', type: 'Multiple Choice' },
    { id: 2, question: 'Explain the process of photosynthesis', type: 'Essay' },
    { id: 3, question: 'True or False: The Earth is flat', type: 'True/False' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* Back Button */}
        <Button
          startIcon={<MdArrowBack />}
          onClick={() => navigate(`/competitions/${id}`)}
          sx={{ alignSelf: 'flex-start' }}
        >
          Back to Competition
        </Button>

        {/* Page Header */}
        <Box>
          <Typography variant="h3" gutterBottom color="primary">
            <MdAssignment style={{ verticalAlign: 'middle', marginInlineEnd: 8 }} />
            Competition Exam
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {exam.title}
          </Typography>
        </Box>

        {/* Exam Details */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Exam Information
            </Typography>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.secondary">Duration:</Typography>
                <Typography>{exam.duration}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.secondary">Total Questions:</Typography>
                <Typography>{exam.totalQuestions}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.secondary">Passing Score:</Typography>
                <Typography>{exam.passingScore}%</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.secondary">Difficulty:</Typography>
                <Chip label={exam.difficulty} size="small" color="info" />
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Questions Preview */}
        <Box>
          <Typography variant="h5" gutterBottom>
            Questions Preview
          </Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>
            {questions.map((q, index) => (
              <Card key={q.id}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Question {index + 1}
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        {q.question}
                      </Typography>
                    </Box>
                    <Chip label={q.type} size="small" />
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" size="large">
            Edit Exam
          </Button>
          <Button variant="outlined" size="large">
            Preview Full Exam
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}

export default CompetitionExamPage;

