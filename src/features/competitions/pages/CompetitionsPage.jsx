import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Button,
  Grid,
  Chip,
} from '@mui/material';
import { MdAdd, MdEmojiEvents } from 'react-icons/md';

function CompetitionsPage() {
  const navigate = useNavigate();

  // Mock competitions data
  const competitions = [
    { id: 1, name: 'Science Quiz 2025', status: 'Active', participants: 150 },
    { id: 2, name: 'Math Olympiad', status: 'Upcoming', participants: 89 },
    { id: 3, name: 'Arabic Literature', status: 'Completed', participants: 234 },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* Page Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h3" gutterBottom color="primary">
              المسابقات / Competitions
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage competitions and exams
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<MdAdd />}>
            New Competition
          </Button>
        </Box>

        {/* Competitions Grid */}
        <Grid container spacing={3}>
          {competitions.map((competition) => (
            <Grid item xs={12} md={6} lg={4} key={competition.id}>
              <Card
                sx={{
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' },
                }}
                onClick={() => navigate(`/competitions/${competition.id}`)}
              >
                <CardContent>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <MdEmojiEvents size={24} color="#006239" />
                      <Typography variant="h6">{competition.name}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip
                        label={competition.status}
                        size="small"
                        color={
                          competition.status === 'Active'
                            ? 'success'
                            : competition.status === 'Upcoming'
                            ? 'info'
                            : 'default'
                        }
                      />
                      <Chip label={`${competition.participants} participants`} size="small" />
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

export default CompetitionsPage;

