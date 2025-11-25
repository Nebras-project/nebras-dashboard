import { Box } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { ActionsMenu } from '@components';
import { SPACING_VALUES } from '@constants/spacing';

/**
 * SubjectActions Component
 *
 * Single Responsibility: Display actions menu for a subject item
 */
function SubjectActions({ actions }) {
  return (
    <Box
      className="subject-actions"
      sx={{
        position: 'absolute',
        right: SPACING_VALUES.xs,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1,
        opacity: 0,
        transition: 'opacity 0.2s ease',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <ActionsMenu
        actions={actions}
        iconButtonProps={{
          size: 'small',
        }}
        checkPermissions={false}
      />
    </Box>
  );
}

SubjectActions.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.element])).isRequired,
};

export default SubjectActions;
