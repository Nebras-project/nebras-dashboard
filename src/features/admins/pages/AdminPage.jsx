// external imports
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useTranslation } from '@hooks';
import { PageLayout, Loader } from '@components';

// internal imports
import { useAdmin } from '../hooks';
import {
  AdminFormDialog,
  AdminProfileCard,
  AdminDetailsCard,
  AdminErrorState,
} from '../components';

function AdminPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { admin, isLoading, isError } = useAdmin({ id });

  if (isLoading) {
    return (
      <PageLayout title={t('admins.adminDetails')}>
        <Loader />
      </PageLayout>
    );
  }

  if (isError || !admin) {
    return (
      <PageLayout title={t('admins.adminDetails')}>
        <AdminErrorState />
      </PageLayout>
    );
  }

  return (
    <AdminFormDialog showAddButton={false}>
      {({ onEdit }) => (
        <>
          <PageLayout title={t('admins.adminDetails')} showBackButton={false}>
            <Grid container spacing={3} alignItems="stretch">
              {/* Profile Card */}
              <Grid item size={{ mobile: 12, desktop: 3 }}>
                <AdminProfileCard admin={admin} />
              </Grid>

              {/* Details Card */}
              <Grid item size={{ mobile: 12, desktop: 5 }}>
                <AdminDetailsCard admin={admin} onEdit={onEdit} />
              </Grid>
            </Grid>
          </PageLayout>
        </>
      )}
    </AdminFormDialog>
  );
}

export default AdminPage;
