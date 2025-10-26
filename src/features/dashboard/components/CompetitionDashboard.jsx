import { Grid, Card, CardContent, Typography, Stack, Box } from '@mui/material';
import { MdEmojiEvents, MdPeople, MdUpcoming, MdPendingActions } from 'react-icons/md';
import StatCard from './StatCard';

/**
 * Dashboard for Competition Manager role
 * Shows competition-specific statistics
 */
function CompetitionDashboard() {
  const stats = [
    { title: 'Active Competitions', value: '5', icon: MdEmojiEvents, color: 'primary', trend: 2 },
    { title: 'Total Participants', value: '1,234', icon: MdPeople, color: 'secondary', trend: 15 },
    { title: 'Upcoming Events', value: '3', icon: MdUpcoming, color: 'success', trend: 0 },
    { title: 'Pending Results', value: '2', icon: MdPendingActions, color: 'warning', trend: -1 },
  ];

  return (
    <Stack spacing={4}>
      {/* Page Header */}
      <Box>
        <Typography variant="h3" gutterBottom color="primary">
          لوحة المسابقات / Competition Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage competitions and track participation
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid xs={12} sm={6} md={3} key={stat.title}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Recent Competition Activity */}
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Recent Competition Updates
          </Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="body2">
                {`🏆 "Science Quiz 2025" registration opened - 234 registrations`}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                1 hour ago
              </Typography>
            </Box>
            <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="body2">
                {`✅ Published results for "Math Olympiad" - 156 participants`}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                5 hours ago
              </Typography>
            </Box>
            <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="body2">
                {`📅 Created new competition "Arabic Literature Challenge"`}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Yesterday
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default CompetitionDashboard;

