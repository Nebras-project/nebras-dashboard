import PropTypes from 'prop-types';
import { Box, Stack } from '@mui/material';
import { margin } from '@constants';
import CompetitionCardName from './CompetitionCardName';
import CompetitionCardStatus from './CompetitionCardStatus';
import CompetitionCardActions from './CompetitionCardActions';

function CompetitionCardHeader({
  competition,
  onView,
  onViewMembers,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  const handleActionsClick = (event) => {
    event.stopPropagation();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        ...margin.bottom.md,
      }}
    >
      {/* Right: Title and Status */}

      <Stack direction="row" spacing={2} alignItems="center">
        <CompetitionCardName competition={competition} />
        <CompetitionCardStatus competition={competition} />
      </Stack>

      <Box onClick={handleActionsClick}>
        <CompetitionCardActions
          competition={competition}
          onViewMembers={onViewMembers}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      </Box>
    </Box>
  );
}

CompetitionCardHeader.propTypes = {
  competition: PropTypes.object.isRequired,
  onView: PropTypes.func,
  onViewMembers: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onStatusChange: PropTypes.func,
};

export default CompetitionCardHeader;
