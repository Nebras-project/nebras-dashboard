// external imports
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useTranslation } from '@hooks';
import { PageLayout, Loader } from '@components';

// internal imports
import { useManager } from '../hooks';
import {
  ManagerFormDialog,
  ManagerProfileCard,
  ManagerDetailsCard,
  ManagerErrorState,
} from '../components';

function ManagerPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { manager, isLoading, isError } = useManager({ id });

  if (isLoading) {
    return (
      <PageLayout title={t('managers.managerDetails')}>
        <Loader />
      </PageLayout>
    );
  }

  if (isError || !manager) {
    return (
      <PageLayout title={t('managers.managerDetails')}>
        <ManagerErrorState />
      </PageLayout>
    );
  }

  return (
    <ManagerFormDialog showAddButton={false}>
      {({ onEdit }) => (
        <>
          <PageLayout title={t('managers.managerDetails')} showBackButton={false}>
            <Grid container spacing={3} alignItems="stretch">
              {/* Profile Card */}
              <Grid item size={{ mobile: 12, desktop: 3 }}>
                <ManagerProfileCard manager={manager} />
              </Grid>

              {/* Details Card */}
              <Grid item size={{ mobile: 12, desktop: 5 }}>
                <ManagerDetailsCard manager={manager} onEdit={onEdit} />
              </Grid>
            </Grid>
          </PageLayout>
        </>
      )}
    </ManagerFormDialog>
  );
}

export default ManagerPage;
