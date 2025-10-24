import { Container, Box, Typography, Card, CardContent, Stack, Button, Grid, Chip } from '@mui/material';
import { MdAdd, MdMenuBook } from 'react-icons/md';
import { useTranslation } from '../../../hooks';

function SubjectsPage() {
  const { t } = useTranslation();
  // Mock subjects data
  const subjects = [
    { id: 1, name: 'Algebra', curriculum: 'Math Grade 10', units: 8, lessons: 32 },
    { id: 2, name: 'Geometry', curriculum: 'Math Grade 10', units: 6, lessons: 24 },
    { id: 3, name: 'Physics', curriculum: 'Science Grade 9', units: 7, lessons: 28 },
    { id: 4, name: 'Chemistry', curriculum: 'Science Grade 9', units: 5, lessons: 20 },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* Page Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h3" gutterBottom color="primary">
              {t('curriculum.subjects')}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('curriculum.subject')}
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<MdAdd />}>
            {t('curriculum.addSubject')}
          </Button>
        </Box>

        {/* Subjects Grid */}
        <Grid container spacing={3}>
          {subjects.map((subject) => (
            <Grid item xs={12} md={6} key={subject.id}>
              <Card>
                <CardContent>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <MdMenuBook size={24} color="#006239" />
                      <Typography variant="h6">{subject.name}</Typography>
                    </Box>
                    <Chip label={subject.curriculum} size="small" variant="outlined" />
                    <Stack spacing={1}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                          {t('curriculum.units')}:
                        </Typography>
                        <Typography variant="body2" fontWeight="medium">
                          {subject.units}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                          {t('curriculum.lessons')}:
                        </Typography>
                        <Typography variant="body2" fontWeight="medium">
                          {subject.lessons}
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

export default SubjectsPage;

