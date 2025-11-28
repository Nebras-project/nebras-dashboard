import PropTypes from 'prop-types';
import { Card } from '@mui/material';
import { useReduxTheme } from '@hooks';
import CompetitionCardHeader from './CompetitionCardHeader';
import CompetitionCardDetails from './CompetitionCardDetails';
import CompetitionForm from './CompetitionForm';
import { useCompetitionCard } from '../hooks';
import { borderColors } from '@theme/colors';
import { borderRadius } from '@theme/components';
import { padding } from '@constants';

function CompetitionCard({ competition }) {
  const { mode } = useReduxTheme();
  const {
    formOpen,
    handleView,
    handleViewMembers,
    handleEdit,
    handleDelete,
    handleStatusChange,
    handleFormClose,
    handleCardClick,
  } = useCompetitionCard(competition);

  return (
    <>
      <Card
        onClick={handleCardClick}
        sx={{
          bgcolor: 'background.default',
          border: `1px solid ${borderColors[mode]}`,
          position: 'relative',
          cursor: 'pointer',
          borderRadius: borderRadius.xxs,
          ...padding.all.lg,
        }}
      >
        <CompetitionCardHeader
          competition={competition}
          onView={handleView}
          onViewMembers={handleViewMembers}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />

        <CompetitionCardDetails competition={competition} />
      </Card>

      <CompetitionForm
        mode="dialog"
        open={formOpen}
        onClose={handleFormClose}
        defaultValues={competition}
        isEdit={true}
      />
    </>
  );
}

CompetitionCard.propTypes = {
  competition: PropTypes.object.isRequired,
};

export default CompetitionCard;
