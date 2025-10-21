import { Container, Box, Typography, Card, CardContent, Stack, Button, Avatar, Chip } from '@mui/material';
import { MdAdd, MdAdminPanelSettings } from 'react-icons/md';

function AdminsPage() {
  // Mock admins data
  const admins = [
    { id: 1, name: 'Mohammed Ali', email: 'mohammed@nebras.com', role: 'Super Admin', status: 'Active' },
    { id: 2, name: 'Sarah Hassan', email: 'sarah@nebras.com', role: 'Admin', status: 'Active' },
    { id: 3, name: 'Ahmed Khalid', email: 'ahmed@nebras.com', role: 'Moderator', status: 'Active' },
    { id: 4, name: 'Fatima Omar', email: 'fatima@nebras.com', role: 'Admin', status: 'Inactive' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* Page Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h3" gutterBottom color="primary">
              المسؤولين / Admins
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage system administrators and permissions
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<MdAdd />}>
            Add Admin
          </Button>
        </Box>

        {/* Admins List */}
        <Stack spacing={2}>
          {admins.map((admin) => (
            <Card key={admin.id}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                    <MdAdminPanelSettings size={28} />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6">{admin.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {admin.email}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Chip label={admin.role} size="small" color="primary" variant="outlined" />
                    <Chip
                      label={admin.status}
                      size="small"
                      color={admin.status === 'Active' ? 'success' : 'default'}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}

export default AdminsPage;

