import { useTranslation } from '@hooks';
import { PageLayout } from '@components';
import StatsGrid from './StatsGrid';
import PropTypes from 'prop-types';

function ContentOverview({ counters = [] }) {
  const { t } = useTranslation();

  return (
    <PageLayout title={t('navigation.dashboard')} description={t('dashboard.contentOverview')}>
      <StatsGrid counters={counters} t={t} spacing={3} />
    </PageLayout>
  );
}

ContentOverview.propTypes = {
  counters: PropTypes.array,
};

export default ContentOverview;
