import { useParams, useNavigate } from 'react-router-dom';
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
import { MdArrowBack, MdPeople, MdAssignment, MdBarChart } from 'react-icons/md';

function CompetitionPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* Back Button */}
        <Button
          startIcon={<MdArrowBack />}
          onClick={() => navigate('/competitions')}
          sx={{ alignSelf: 'flex-start' }}
        >
          Back to Competitions
        </Button>

        {/* Page Header */}
        <Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="h3" color="primary">
              Science Quiz 2025
            </Typography>
            <Chip label="Active" color="success" />
          </Stack>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Competition ID: {id}
          </Typography>
        </Box>

        {/* Quick Actions */}
        <Grid container spacing={3}>
          <Grid xs={12} sm={6} md={4}>
            <Card
              sx={{
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)' },
              }}
              onClick={() => navigate(`/competitions/${id}/members`)}
            >
              <CardContent>
                <Stack spacing={2} alignItems="center" textAlign="center">
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 2,
                      bgcolor: 'primary.main',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <MdPeople size={32} />
                  </Box>
                  <Typography variant="h6">Members</Typography>
                  <Typography variant="body2" color="text.secondary">
                    150 Participants
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <Card
              sx={{
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)' },
              }}
              onClick={() => navigate(`/competitions/${id}/exam`)}
            >
              <CardContent>
                <Stack spacing={2} alignItems="center" textAlign="center">
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 2,
                      bgcolor: 'secondary.main',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <MdAssignment size={32} />
                  </Box>
                  <Typography variant="h6">Exam</Typography>
                  <Typography variant="body2" color="text.secondary">
                    25 Questions
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <Card
              sx={{
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)' },
              }}
              onClick={() => navigate(`/competitions/${id}/result`)}
            >
              <CardContent>
                <Stack spacing={2} alignItems="center" textAlign="center">
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 2,
                      bgcolor: 'success.main',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <MdBarChart size={32} />
                  </Box>
                  <Typography variant="h6">Results</Typography>
                  <Typography variant="body2" color="text.secondary">
                    View Statistics
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Competition Details */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Competition Details
            </Typography>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.secondary">Start Date:</Typography>
                <Typography>January 15, 2025</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.secondary">End Date:</Typography>
                <Typography>January 30, 2025</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.secondary">Duration:</Typography>
                <Typography>60 minutes</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.secondary">Passing Score:</Typography>
                <Typography>70%</Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}

export default CompetitionPage;

