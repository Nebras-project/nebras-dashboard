// external imports
import { useEntity } from '@hooks';
import { QUERY_KEYS } from '@config';
import { fetchOverviewStats } from '../services/overviewApi';

// internal imports

export const useOverview = ({ enabled = true, onError } = {}) => {
  const { data } = useEntity({
    getListFn: fetchOverviewStats,
    queryKey: [QUERY_KEYS.OVERVIEW_STATS],
    enabled,
    onError,
  });

  const {
    adminsCount,
    managersCount,
    studentsCount,
    gradesCount,
    formsCount,
    ministerialQuestionsCount,
    enrichmentQuestionsCount,
  } = data || {};
  // Return with student-specific property names
  return {
    adminsCount,
    managersCount,
    studentsCount,
    gradesCount,
    formsCount,
    ministerialQuestionsCount,
    enrichmentQuestionsCount,
    totalQuestionsCount: (ministerialQuestionsCount || 0) + (enrichmentQuestionsCount || 0),
  };
};
