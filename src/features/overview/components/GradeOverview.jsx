import PropTypes from 'prop-types';
import { PageLayout } from '@components';
import { useTranslation } from '@hooks';
import StatsGrid from './StatsGrid';

function GradeOverview({ counters = [] }) {
  const { t } = useTranslation();

  return (
    <PageLayout title={t('navigation.dashboard')} description={t('dashboard.gradeOverview')}>
      <StatsGrid counters={counters} t={t} spacing={3} />
    </PageLayout>
  );
}

GradeOverview.propTypes = {
  counters: PropTypes.array,
};

export default GradeOverview;
