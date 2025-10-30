import { Container, Box, Typography } from '@mui/material';
import { PageLayout } from '@components';
import { useTranslation } from '@hooks';

function AdminsPage() {
  const { t } = useTranslation();


  return (
    <PageLayout title={t('admins.admins')} description={t('users.permissions')} maxWidth="lg">
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
          <Typography variant="body2" sx={{ mt: 1 }}>Content coming soon</Typography>
        </Box>
      </Container>
    </PageLayout>
  );
}

export default AdminsPage;

