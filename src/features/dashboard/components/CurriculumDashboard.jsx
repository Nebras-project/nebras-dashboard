import { Grid, Card, CardContent, Typography, Stack, Box } from '@mui/material';
import StatCard from './StatCard';
import { Message } from '@components';

function CurriculumDashboard() {
  const stats = [
    { title: 'Total Subjects', value: '12', icon: 'school', color: 'primary', trend: 0 },
    { title: 'Total Units', value: '45', icon: 'book', color: 'secondary', trend: 5 },
    { title: 'Total Lessons', value: '230', icon: 'class', color: 'success', trend: 18 },
    { title: 'Completed', value: '198', icon: 'checkCircle', color: 'info', trend: 12 },
  ];

  return (
    <Stack spacing={4}>
      {/* Page Header */}
      <Box>
        <Typography variant="h3" gutterBottom color="primary">
          لوحة المنهج / Curriculum Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and track curriculum progress
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

      {/* Recent Curriculum Activity */}
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Recent Curriculum Updates
          </Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Message
              variant="info"
              message={`📖 Added 5 new lessons to "Physics Grade 11"`}
              title="3 hours ago"
              showIcon={false}
            />
            <Message
              variant="warning"
              message={`📚 Updated "Chemistry" curriculum structure`}
              title="1 day ago"
              showIcon={false}
            />
            <Message
              variant="success"
              message={`✅ Completed "Biology Grade 10" curriculum`}
              title="2 days ago"
              showIcon={false}
            />
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default CurriculumDashboard;
