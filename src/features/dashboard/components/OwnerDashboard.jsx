import { Grid, Card, CardContent, Typography, Stack, Box } from '@mui/material';
import StatCard from './StatCard';
import { Message } from '@components';
import FormExamplesPage from '../../../examples/FormExamplesPage';

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
      <FormExamplesPage />
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
            <Message
              variant="success"
              message={`📚 New curriculum "Math Grade 10" added by Curriculum Manager`}
              title="2 hours ago"
              showIcon={false}
            />
            <Message
              variant="info"
              message={`🏆 Competition "Science Quiz 2025" started`}
              title="5 hours ago"
              showIcon={false}
            />
            <Message
              variant="info"
              message="👥 25 new students registered"
              title="1 day ago"
              showIcon={false}
            />
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default OwnerDashboard;
