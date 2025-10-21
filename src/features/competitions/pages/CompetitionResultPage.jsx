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
  LinearProgress,
} from '@mui/material';
import { MdArrowBack, MdBarChart, MdEmojiEvents } from 'react-icons/md';

function CompetitionResultPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock results data
  const stats = {
    totalParticipants: 150,
    completed: 120,
    averageScore: 78,
    passRate: 85,
  };

  const topScorers = [
    { rank: 1, name: 'Mohammed Saeed', score: 98 },
    { rank: 2, name: 'Fatima Hassan', score: 95 },
    { rank: 3, name: 'Ahmed Ali', score: 92 },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* Back Button */}
        <Button
          startIcon={<MdArrowBack />}
          onClick={() => navigate(`/competitions/${id}`)}
          sx={{ alignSelf: 'flex-start' }}
        >
          Back to Competition
        </Button>

        {/* Page Header */}
        <Box>
          <Typography variant="h3" gutterBottom color="primary">
            <MdBarChart style={{ verticalAlign: 'middle', marginInlineEnd: 8 }} />
            Competition Results
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Performance statistics and rankings
          </Typography>
        </Box>

        {/* Statistics Grid */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="primary" fontWeight="bold">
                  {stats.totalParticipants}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Participants
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="success.main" fontWeight="bold">
                  {stats.completed}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completed
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="info.main" fontWeight="bold">
                  {stats.averageScore}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Average Score
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="secondary.main" fontWeight="bold">
                  {stats.passRate}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pass Rate
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Top Scorers */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              <MdEmojiEvents style={{ verticalAlign: 'middle', marginInlineEnd: 8 }} />
              Top Scorers
            </Typography>
            <Stack spacing={2} sx={{ mt: 3 }}>
              {topScorers.map((scorer) => (
                <Box
                  key={scorer.rank}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    bgcolor: 'background.surface.level2',
                    borderRadius: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      bgcolor:
                        scorer.rank === 1
                          ? 'warning.main'
                          : scorer.rank === 2
                          ? 'grey.400'
                          : '#cd7f32',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: 20,
                    }}
                  >
                    {scorer.rank}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6">{scorer.name}</Typography>
                    <LinearProgress
                      variant="determinate"
                      value={scorer.score}
                      sx={{ mt: 1, height: 8, borderRadius: 1 }}
                    />
                  </Box>
                  <Typography variant="h5" fontWeight="bold" color="primary">
                    {scorer.score}%
                  </Typography>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>

        {/* Export Button */}
        <Box>
          <Button variant="contained" size="large">
            Export Results to Excel
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}

export default CompetitionResultPage;

