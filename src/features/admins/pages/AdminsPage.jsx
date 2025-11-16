import { PageLayout } from '@components';
import { useTranslation } from '@hooks';

import { AdminsTable, AdminFormDialog } from '../components';

function AdminsPage() {
  const { t } = useTranslation();

  return (
    <PageLayout title={t('admins.admins')} description={t('admins.description')}>
      <AdminFormDialog>{({ onEdit }) => <AdminsTable onEdit={onEdit} />}</AdminFormDialog>
    </PageLayout>
  );
}

export default AdminsPage;
