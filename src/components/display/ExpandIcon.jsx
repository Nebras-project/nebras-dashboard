// external imports
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { Icon } from '@components';

/**
 * Get base styles for the expand icon container
 * @param {boolean} isOpen - Whether the icon is in expanded state
 * @param {string} transitionDuration - Transition duration
 * @returns {Object} Style object
 */
const getExpandIconStyles = (isOpen, transitionDuration) => ({
  display: 'flex',
  alignItems: 'center',
  color: 'text.secondary',
  transition: `transform ${transitionDuration} ease-in-out, color ${transitionDuration}`,
  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
  '&:hover': {
    color: 'primary.main',
  },
});

/**
 * ExpandIcon Component
 *
 * Reusable expand/collapse icon with smooth rotation transition.
 * Decoupled component that requires isOpen prop to be passed explicitly.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the icon should be in expanded state (required)
 * @param {number} props.size - Icon size (default: 20)
 * @param {string} props.iconName - Icon name (default: 'expandMore')
 * @param {Object} props.sx - Additional styles
 * @param {string} props.transitionDuration - Transition duration (default: '0.2s')
 */
function ExpandIcon({
  isOpen = false,
  size = 20,
  iconName = 'expandMore',
  sx = {},
  transitionDuration = '0.2s',
}) {
  return (
    <Box
      sx={{
        ...getExpandIconStyles(isOpen, transitionDuration),
        ...sx,
      }}
      aria-hidden="true"
    >
      <Icon name={iconName} size={size} />
    </Box>
  );
}

ExpandIcon.propTypes = {
  isOpen: PropTypes.bool,
  size: PropTypes.number,
  iconName: PropTypes.string,
  sx: PropTypes.object,
  transitionDuration: PropTypes.string,
};

export default ExpandIcon;
