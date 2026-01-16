import { useTranslation } from '@hooks';
import StatsGrid from './StatsGrid';
import { PageLayout } from '@components';
import PropTypes from 'prop-types';

function CompetitionOverview({ counters = [] }) {
  const { t } = useTranslation();
  return (
    <PageLayout title={t('navigation.dashboard')} description={t('dashboard.competitionOverview')}>
      <StatsGrid counters={counters} t={t} spacing={3} />
    </PageLayout>
  );
}

CompetitionOverview.propTypes = {
  counters: PropTypes.array,
};

export default CompetitionOverview;
