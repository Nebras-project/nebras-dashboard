import { Grid, Card, CardContent, Typography, Stack, Box } from '@mui/material';
import StatCard from './StatCard';

function ContentDashboard() {
  const stats = [
    { title: 'Total Questions', value: '5,432', icon: 'quiz', color: 'primary', trend: 45 },
    { title: 'Ministerial Questions', value: '892', icon: 'school', color: 'secondary', trend: 12 },
    {
      title: 'Enrichment Questions',
      value: '1,234',
      icon: 'libraryBooks',
      color: 'success',
      trend: 28,
    },
    { title: 'This Month', value: '+156', icon: 'trendingUp', color: 'info', trend: 15 },
  ];

  const questionsByDifficulty = [
    { level: 'Easy', count: 2145, color: 'success.main' },
    { level: 'Medium', count: 2287, color: 'warning.main' },
    { level: 'Hard', count: 1000, color: 'error.main' },
  ];

  return (
    <Stack spacing={4}>
      {/* Page Header */}
      <Box>
        <Typography variant="h3" gutterBottom color="primary">
          لوحة المحتوى / Content Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and track question bank
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

      {/* Questions by Difficulty */}
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Questions by Difficulty
          </Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>
            {questionsByDifficulty.map((item) => (
              <Box
                key={item.level}
                sx={{
                  p: 2,
                  bgcolor: 'background.default',
                  borderRadius: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body1" fontWeight="medium">
                  {item.level}
                </Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ color: item.color }}>
                  {item.count.toLocaleString()}
                </Typography>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Recently Added Questions
          </Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="body2">
                {`✏️ Added 25 new questions to "Physics Grade 11"`}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                2 hours ago
              </Typography>
            </Box>
            <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="body2">
                {`📝 Updated 12 ministerial questions for "Math Grade 10"`}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                6 hours ago
              </Typography>
            </Box>
            <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="body2">
                {`🎯 Created 18 enrichment questions for "Chemistry"`}
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

export default ContentDashboard;
