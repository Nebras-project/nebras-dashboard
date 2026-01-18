import { useAuth } from '@hooks';
import { useMemo } from 'react';
import {
  OwnerOverview,
  GradeOverview,
  CompetitionOverview,
  ContentOverview,
  AdminOverview,
} from '../components';
import { getOverviewStatisticsByRole } from '../config/overviewConfig';
import { useOverview } from '../hooks/useOverview';

function OverviewPage() {
  const { role } = useAuth();

  const overviewStats = useOverview();
  const counters = useMemo(
    () => getOverviewStatisticsByRole(role, overviewStats),
    [role, overviewStats]
  );

  // Render appropriate overview based on role
  const renderOverview = () => {
    switch (role) {
      case 'owner':
        return <OwnerOverview counters={counters} />;
      case 'generalAdmin':
        return <AdminOverview counters={counters} />;
      case 'gradeManager':
        return <GradeOverview counters={counters} />;

      case 'competitionManager':
        return <CompetitionOverview counters={counters} />;

      case 'contentManager':
        return <ContentOverview counters={counters} />;
    }
  };

  return <>{renderOverview()}</>;
}

export default OverviewPage;
