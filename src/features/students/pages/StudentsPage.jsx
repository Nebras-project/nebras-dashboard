import { Container, Box, Typography, Card, CardContent, Stack, Button } from '@mui/material';
import { MdAdd, MdPeople } from 'react-icons/md';

function StudentsPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* Page Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h3" gutterBottom color="primary">
              الطلاب / Students
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage student records and information
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<MdAdd />}>
            Add Student
          </Button>
        </Box>

        {/* Placeholder Content */}
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <MdPeople size={64} style={{ opacity: 0.3 }} />
            <Typography variant="h5" sx={{ mt: 2 }} color="text.secondary">
              Students Management
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
              This page will display student list, filters, and management tools
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}

export default StudentsPage;

