import { Grid, Card, CardContent, Typography, Stack, Box } from '@mui/material';
import StatCard from './StatCard';

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
            <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="body2">
                {`📖 Added 5 new lessons to "Physics Grade 11"`}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                3 hours ago
              </Typography>
            </Box>
            <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="body2">
                {`📚 Updated "Chemistry" curriculum structure`}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                1 day ago
              </Typography>
            </Box>
            <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="body2">
                {`✅ Completed "Biology Grade 10" curriculum`}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                2 days ago
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default CurriculumDashboard;
