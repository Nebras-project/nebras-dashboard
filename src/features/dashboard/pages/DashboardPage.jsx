import { Container, Box, Typography, Grid, Card, CardContent, Stack, Chip } from '@mui/material';
import { MdPeople, MdEmojiEvents, MdMenuBook, MdSchool } from 'react-icons/md';

function DashboardPage() {
  const stats = [
    { title: 'Students', value: '1,234', icon: MdPeople, color: 'primary' },
    { title: 'Competitions', value: '45', icon: MdEmojiEvents, color: 'secondary' },
    { title: 'Curriculums', value: '12', icon: MdSchool, color: 'success' },
    { title: 'Subjects', value: '56', icon: MdMenuBook, color: 'info' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* Page Header */}
        <Box>
          <Typography variant="h3" gutterBottom color="primary">
            لوحة التحكم / Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome to Nebras Educational Management System
          </Typography>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={3}>
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Grid item xs={12} sm={6} md={3} key={stat.title}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Stack spacing={2}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 2,
                          bgcolor: `${stat.color}.main`,
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon size={28} />
                      </Box>
                      <Box>
                        <Typography variant="h4" fontWeight="bold">
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {stat.title}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* Recent Activity */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Recent Activity
            </Typography>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Box sx={{ p: 2, bgcolor: 'background.surface.level2', borderRadius: 1 }}>
                <Typography variant="body2">
                  📚 New curriculum "Math Grade 10" added
                </Typography>
              </Box>
              <Box sx={{ p: 2, bgcolor: 'background.surface.level2', borderRadius: 1 }}>
                <Typography variant="body2">
                  🏆 Competition "Science Quiz 2025" started
                </Typography>
              </Box>
              <Box sx={{ p: 2, bgcolor: 'background.surface.level2', borderRadius: 1 }}>
                <Typography variant="body2">
                  👥 25 new students registered
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Status Badge */}
        <Box sx={{ textAlign: 'center' }}>
          <Chip label="✅ Phase 1: Foundation - Router Setup Complete" color="success" />
        </Box>
      </Stack>
    </Container>
  );
}

export default DashboardPage;

