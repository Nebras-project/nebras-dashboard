// external imports
// internal imports
import { PageLayout } from '@components';
import { useTranslation } from '@hooks';
import StatsGrid from './StatsGrid';
import PropTypes from 'prop-types';
import OverviewPieChartsGrid from './OverviewPieChartsGrid';
import { useOverview } from '../hooks/useOverview';
import { getManagersPieOptions, getQuestionPieOptions, preparePieChartSchema } from '../utils';

function OwnerOverview({ counters = [] }) {
  const { t } = useTranslation();

  const {
    ministerialQuestionsCount,
    enrichmentQuestionsCount,
    contentManagersCount,
    competitionManagersCount,
    gradeManagersCount,
  } = useOverview();

  const questionsPie = preparePieChartSchema({
    titleKey: 'questions.breakdown',
    counts: { ministerialQuestionsCount, enrichmentQuestionsCount },
    t,
    optionFn: getQuestionPieOptions,
  });

  const managersPie = preparePieChartSchema({
    titleKey: 'managers.breakdown',
    counts: { contentManagersCount, competitionManagersCount, gradeManagersCount },
    t,
    optionFn: getManagersPieOptions,
  });

  return (
    <PageLayout title={t('navigation.dashboard')} description={t('dashboard.ownerOverview')}>
      <StatsGrid counters={counters} t={t} spacing={3} />
      <OverviewPieChartsGrid pies={[questionsPie, managersPie]} t={t} />

    </PageLayout>
  );
}

OwnerOverview.propTypes = {
  counters: PropTypes.array,
};

export default OwnerOverview;
