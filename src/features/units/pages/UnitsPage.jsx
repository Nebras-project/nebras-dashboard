import { Container, Box, Typography, Card, CardContent, Stack, Button, Chip } from '@mui/material';
import { MdAdd, MdFolder } from 'react-icons/md';

function UnitsPage() {
  // Mock units data
  const units = [
    { id: 1, name: 'Linear Equations', subject: 'Algebra', lessons: 4, status: 'Published' },
    { id: 2, name: 'Quadratic Equations', subject: 'Algebra', lessons: 6, status: 'Published' },
    { id: 3, name: 'Triangles', subject: 'Geometry', lessons: 5, status: 'Draft' },
    { id: 4, name: 'Circles', subject: 'Geometry', lessons: 4, status: 'Published' },
    { id: 5, name: 'Motion and Forces', subject: 'Physics', lessons: 7, status: 'Published' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* Page Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h3" gutterBottom color="primary">
              الوحدات / Units
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage curriculum units and chapters
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<MdAdd />}>
            Add Unit
          </Button>
        </Box>

        {/* Units List */}
        <Stack spacing={2}>
          {units.map((unit) => (
            <Card key={unit.id}>
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
                    <MdFolder size={24} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6">{unit.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {unit.subject} • {unit.lessons} Lessons
                    </Typography>
                  </Box>
                  <Chip
                    label={unit.status}
                    size="small"
                    color={unit.status === 'Published' ? 'success' : 'default'}
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

export default UnitsPage;

