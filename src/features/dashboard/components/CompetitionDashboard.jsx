import { Grid, Card, CardContent, Typography, Stack, Box } from '@mui/material';
import StatCard from './StatCard';
import { Message } from '@components';

function CompetitionDashboard() {
  const stats = [
    { title: 'Active Competitions', value: '5', icon: 'emojiEvents', color: 'primary', trend: 2 },
    { title: 'Total Participants', value: '1,234', icon: 'people', color: 'secondary', trend: 15 },
    { title: 'Upcoming Events', value: '3', icon: 'upcoming', color: 'success', trend: 0 },
    { title: 'Pending Results', value: '2', icon: 'pendingActions', color: 'warning', trend: -1 },
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
            <Message
              variant="success"
              message={`🏆 "Science Quiz 2025" registration opened - 234 registrations`}
              title="1 hour ago"
              showIcon={false}
            />
            <Message
              variant="success"
              message={`✅ Published results for "Math Olympiad" - 156 participants`}
              title="5 hours ago"
              showIcon={false}
            />
            <Message
              variant="info"
              message={`📅 Created new competition "Arabic Literature Challenge"`}
              title="Yesterday"
              showIcon={false}
            />
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default CompetitionDashboard;
