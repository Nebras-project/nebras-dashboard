import { useAuth } from '@hooks';
import {
  OwnerOverview,
  CurriculumOverview,
  CompetitionOverview,
  ContentOverview,
} from '../components';

function OverviewPage() {
  const { role } = useAuth();

  // Render appropriate overview based on role
  const renderOverview = () => {
    switch (role) {
      case 'owner':
      case 'general_admin':
        return <OwnerOverview />;

      case 'curriculum_manager':
        return <CurriculumOverview />;

      case 'competition_manager':
        return <CompetitionOverview />;

      case 'content_manager':
        return <ContentOverview />;

      default:
        // Fallback: show owner overview for undefined roles
        return <OwnerOverview />;
    }
  };

  return <>{renderOverview()}</>;
}

export default OverviewPage;
