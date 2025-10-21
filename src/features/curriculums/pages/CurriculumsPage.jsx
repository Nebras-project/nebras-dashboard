import { Container, Box, Typography, Card, CardContent, Stack, Button, Grid, Chip } from '@mui/material';
import { MdAdd, MdSchool } from 'react-icons/md';

function CurriculumsPage() {
  // Mock curriculums data
  const curriculums = [
    { id: 1, name: 'Math Grade 10', subjects: 5, units: 24, status: 'Active' },
    { id: 2, name: 'Science Grade 9', subjects: 4, units: 18, status: 'Active' },
    { id: 3, name: 'Arabic Literature', subjects: 3, units: 15, status: 'Draft' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* Page Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h3" gutterBottom color="primary">
              المناهج / Curriculums
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage educational curriculums and programs
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<MdAdd />}>
            New Curriculum
          </Button>
        </Box>

        {/* Curriculums Grid */}
        <Grid container spacing={3}>
          {curriculums.map((curriculum) => (
            <Grid item xs={12} md={6} lg={4} key={curriculum.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <MdSchool size={24} color="#006239" />
                      <Typography variant="h6">{curriculum.name}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip
                        label={curriculum.status}
                        size="small"
                        color={curriculum.status === 'Active' ? 'success' : 'default'}
                      />
                    </Box>
                    <Stack spacing={1}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                          Subjects:
                        </Typography>
                        <Typography variant="body2" fontWeight="medium">
                          {curriculum.subjects}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                          Units:
                        </Typography>
                        <Typography variant="body2" fontWeight="medium">
                          {curriculum.units}
                        </Typography>
                      </Box>
                    </Stack>
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

export default CurriculumsPage;

