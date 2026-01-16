// external imports
import PropTypes from 'prop-types';

// internal imports
import { PageLayout } from '@components';
import { useTranslation } from '@hooks';
import StatsGrid from './StatsGrid';

function AdminOverview({ counters = [] }) {
  const { t } = useTranslation();

  return (
    <PageLayout title={t('navigation.dashboard')} description={t('dashboard.adminOverview')}>
      <StatsGrid counters={counters} t={t} spacing={3} />
    </PageLayout>
  );
}

AdminOverview.propTypes = {
  counters: PropTypes.array,
};

export default AdminOverview;
