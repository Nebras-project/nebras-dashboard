import { Container, Box, Typography, Card, CardContent, Stack, Button } from '@mui/material';
import { MdAdd, MdPeople } from 'react-icons/md';
import { useTranslation } from '../../../hooks';

function StudentsPage() {
  const { t } = useTranslation();
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* Page Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h3" gutterBottom color="primary">
              {t('students.students')}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('students.studentActivity')}
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<MdAdd />}>
            {t('students.addStudent')}
          </Button>
        </Box>

        {/* Placeholder Content */}
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <MdPeople size={64} style={{ opacity: 0.3 }} />
            <Typography variant="h5" sx={{ mt: 2 }} color="text.secondary">
              {t('students.students')}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
              {t('common.loading')}
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}

export default StudentsPage;

