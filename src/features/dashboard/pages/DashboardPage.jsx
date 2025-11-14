
import { useAuth } from '@hooks';
import {
  OwnerDashboard,
  CurriculumDashboard,
  CompetitionDashboard,
  ContentDashboard,
} from '../components';

function DashboardPage() {
  const { role } = useAuth();

  // Render appropriate dashboard based on role
  const renderDashboard = () => {
    switch (role) {
      case 'owner':
      case 'general_admin':
        return <OwnerDashboard />;

      case 'curriculum_manager':
        return <CurriculumDashboard />;

      case 'competition_manager':
        return <CompetitionDashboard />;

      case 'content_manager':
        return <ContentDashboard />;

      default:
        // Fallback: show owner dashboard for undefined roles
        return <OwnerDashboard />;
    }
  };

  return (
    <>
      {renderDashboard()}
    </>
  );
}

export default DashboardPage;
