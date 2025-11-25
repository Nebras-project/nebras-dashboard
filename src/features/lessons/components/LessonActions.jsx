// external imports
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { ActionsMenu } from '@components';
import { SPACING_VALUES } from '@constants/spacing';

/**
 * LessonActions Component
 *
 * Single Responsibility: Display actions menu for a lesson item
 */
const LessonActions = ({ actions }) => (
  <Box
    className="lesson-actions"
    sx={{
      position: 'absolute',
      right: SPACING_VALUES.xs,
      top: '50%',
      transform: 'translateY(-50%)',
      opacity: 0,
      transition: 'opacity 0.2s ease',
      zIndex: 10,
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

LessonActions.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.element])).isRequired,
};

export { LessonActions };
export default LessonActions;
