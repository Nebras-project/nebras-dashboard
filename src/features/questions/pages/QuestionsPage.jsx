import { Container, Box, Typography, Card, CardContent, Stack, Button, Chip, Grid } from '@mui/material';
import { MdAdd, MdQuiz } from 'react-icons/md';

function QuestionsPage() {
  // Mock questions data
  const questions = [
    { id: 1, question: 'What is the capital of Iraq?', type: 'Multiple Choice', subject: 'Geography', difficulty: 'Easy' },
    { id: 2, question: 'Solve: 2x + 5 = 15', type: 'Short Answer', subject: 'Algebra', difficulty: 'Medium' },
    { id: 3, question: 'Explain photosynthesis process', type: 'Essay', subject: 'Biology', difficulty: 'Hard' },
    { id: 4, question: 'True or False: Baghdad is the largest city in Iraq', type: 'True/False', subject: 'Geography', difficulty: 'Easy' },
    { id: 5, question: 'Calculate the area of a circle with radius 5cm', type: 'Calculation', subject: 'Geometry', difficulty: 'Medium' },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'success';
      case 'Medium': return 'warning';
      case 'Hard': return 'error';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* Page Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h3" gutterBottom color="primary">
              الأسئلة / Questions
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage question bank for exams and assessments
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<MdAdd />}>
            Add Question
          </Button>
        </Box>

        {/* Questions Grid */}
        <Grid container spacing={3}>
          {questions.map((q) => (
            <Grid item xs={12} md={6} key={q.id}>
              <Card>
                <CardContent>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <MdQuiz size={24} color="#006239" />
                      <Typography variant="body1" sx={{ flex: 1 }}>
                        {q.question}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip label={q.type} size="small" color="primary" variant="outlined" />
                      <Chip label={q.subject} size="small" variant="outlined" />
                      <Chip 
                        label={q.difficulty} 
                        size="small" 
                        color={getDifficultyColor(q.difficulty)}
                      />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}

export default QuestionsPage;

