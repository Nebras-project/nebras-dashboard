import { PageLayout } from '@components';
import { useTranslation } from '@hooks';

import { AdminsTable } from '../components';
import { AddButton } from '@components';

function AdminsPage() {
  const { t } = useTranslation();

  return (
    <PageLayout title={t('admins.admins')} description={t('admins.description')}>
      <AddButton label={t('admins.addAdmin')} onClick={() => console.log('Add admin')} />
      <AdminsTable />
    </PageLayout>
  );
}

export default AdminsPage;
