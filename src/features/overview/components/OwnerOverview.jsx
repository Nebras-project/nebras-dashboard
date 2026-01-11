// external imports
import { Grid, Box } from '@mui/material';

// internal imports
import { PageLayout } from '@components';
import { useTranslation } from '@hooks';
import { useAdmin } from '@features/admins/hooks/useAdmin';
import StatCard from './StatCard';

function OwnerOverview() {
  const { t } = useTranslation();

  const { totalCount: adminsCount } = useAdmin();

  return (
    <PageLayout title={t('navigation.dashboard')} description={t('dashboard.overview')}>
      <Box sx={{ py: 3 }}>
        {/* Total Admins */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StatCard
            icon="adminPanel"
            count={adminsCount}
            text={t('navigation.admins')}
            color="secondary"
          />
        </Grid>
      </Box>
    </PageLayout>
  );
}

export default OwnerOverview;
