import { Container, Box, Typography, Card, CardContent, Stack, Button, Chip, Grid } from '@mui/material';
import { MdAdd, MdLightbulb } from 'react-icons/md';

function EnrichmentQuestionsPage() {
  // Mock enrichment questions data
  const enrichmentQuestions = [
    { id: 1, question: 'Design a sustainable city of the future', category: 'Creative Thinking', level: 'Advanced' },
    { id: 2, question: 'How would you solve traffic congestion in Baghdad?', category: 'Problem Solving', level: 'Intermediate' },
    { id: 3, question: 'Create a mathematical pattern using Fibonacci sequence', category: 'Mathematics', level: 'Advanced' },
    { id: 4, question: 'Write a short story about time travel', category: 'Creative Writing', level: 'Beginner' },
    { id: 5, question: 'Propose a solution to reduce plastic waste', category: 'Environmental', level: 'Intermediate' },
  ];

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'info';
      case 'Advanced': return 'secondary';
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
              أسئلة الإثراء / Enrichment Questions
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Advanced questions for talented and gifted students
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<MdAdd />}>
            Add Enrichment Question
          </Button>
        </Box>

        {/* Info Card */}
        <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <MdLightbulb size={40} />
              <Box>
                <Typography variant="h6">
                  Enrichment Questions
                </Typography>
                <Typography variant="body2">
                  Designed to challenge students and develop critical thinking skills beyond the standard curriculum
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Questions Grid */}
        <Grid container spacing={3}>
          {enrichmentQuestions.map((q) => (
            <Grid item xs={12} md={6} key={q.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 1,
                          bgcolor: 'secondary.main',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <MdLightbulb size={24} />
                      </Box>
                      <Typography variant="body1" sx={{ flex: 1 }}>
                        {q.question}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip label={q.category} size="small" color="primary" variant="outlined" />
                      <Chip 
                        label={q.level} 
                        size="small" 
                        color={getLevelColor(q.level)}
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

export default EnrichmentQuestionsPage;

