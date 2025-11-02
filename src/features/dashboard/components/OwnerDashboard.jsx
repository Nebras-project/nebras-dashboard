import { Grid, Card, CardContent, Typography, Stack, Box } from '@mui/material';
import StatCard from './StatCard';

function OwnerDashboard() {
  const stats = [
    { title: 'Total Students', value: '1,234', icon: 'people', color: 'primary', trend: 12 },
    { title: 'Active Competitions', value: '8', icon: 'emojiEvents', color: 'secondary', trend: 2 },
    { title: 'Total Subjects', value: '12', icon: 'school', color: 'success', trend: 0 },
    { title: 'Total Questions', value: '5,432', icon: 'quiz', color: 'info', trend: 45 },
    { title: 'Total Units', value: '45', icon: 'book', color: 'warning', trend: 5 },
    { title: 'System Admins', value: '15', icon: 'adminPanel', color: 'error', trend: 1 },
  ];

  return (
    <Stack spacing={4}>
      {/* Page Header */}
      <Box>
        <Typography variant="h3" gutterBottom color="primary">
          لوحة التحكم الرئيسية / System Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Overview of the entire Nebras Educational System
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid xs={12} sm={6} md={4} key={stat.title}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Recent System Activity */}
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Recent System Activity
          </Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="body2">
                {`📚 New curriculum "Math Grade 10" added by Curriculum Manager`}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                2 hours ago
              </Typography>
            </Box>
            <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="body2">
                {`🏆 Competition "Science Quiz 2025" started`}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                5 hours ago
              </Typography>
            </Box>
            <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="body2">👥 25 new students registered</Typography>
              <Typography variant="caption" color="text.secondary">
                1 day ago
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default OwnerDashboard;
