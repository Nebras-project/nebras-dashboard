import { Container, Box, Typography, Card, CardContent, Stack, Button, Chip, Grid } from '@mui/material';
import { MdAdd, MdAccountBalance } from 'react-icons/md';

function MinisterialQuestionsPage() {
  // Mock ministerial questions data
  const ministerialQuestions = [
    { id: 1, question: 'Discuss the importance of Arabic literature', year: 2024, subject: 'Arabic', status: 'Published' },
    { id: 2, question: 'Solve the quadratic equation: x² - 5x + 6 = 0', year: 2024, subject: 'Mathematics', status: 'Published' },
    { id: 3, question: 'Explain the water cycle', year: 2023, subject: 'Science', status: 'Archived' },
    { id: 4, question: 'Analyze the causes of World War I', year: 2024, subject: 'History', status: 'Draft' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* Page Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h3" gutterBottom color="primary">
              الأسئلة الوزارية / Ministerial Questions
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Official ministerial exam questions archive
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<MdAdd />}>
            Add Ministerial Question
          </Button>
        </Box>

        {/* Stats */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="primary" fontWeight="bold">
                  24
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Questions
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="success.main" fontWeight="bold">
                  18
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Published
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="info.main" fontWeight="bold">
                  2024
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Current Year
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Questions List */}
        <Stack spacing={2}>
          {ministerialQuestions.map((q) => (
            <Card key={q.id}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 1,
                      bgcolor: 'primary.main',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <MdAccountBalance size={24} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6">{q.question}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {q.subject} • Year {q.year}
                    </Typography>
                  </Box>
                  <Chip
                    label={q.status}
                    size="small"
                    color={
                      q.status === 'Published' ? 'success' : 
                      q.status === 'Draft' ? 'warning' : 
                      'default'
                    }
                  />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}

export default MinisterialQuestionsPage;

