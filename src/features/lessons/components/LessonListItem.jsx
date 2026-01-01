// external imports
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { Icon } from '@components';
import { useReduxTheme } from '@hooks';
import { borderColors } from '@theme/colors';
import { borderRadius } from '@theme/components';
import { margin, padding } from '@constants/spacing';
import LessonActions from './LessonActions';

/**
 * LessonListItem Component
 *
 * Single Responsibility: Display a single lesson item in the list
 */
function LessonListItem({ lessonName, actions, mode }) {
  const { isDark } = useReduxTheme();
  return (
    <ListItem
      disablePadding
      sx={{
        ...margin.bottom.xs,
        borderRadius: borderRadius.xxs,
        bgcolor: isDark ? 'background.paper' : 'background.default',
        border: `1px solid ${borderColors[mode]}`,
        ...padding.x.sm,
        ...padding.y.xs,
        ...padding.right.md,
        position: 'relative',
        '&:hover .lesson-actions': {
          opacity: 1,
        },
      }}
    >
      <ListItemIcon sx={{ minWidth: 32 }}>
        <Icon name="book" size={18} color="primary" />
      </ListItemIcon>

      <ListItemText
        primary={lessonName}
        slotProps={{
          primary: { variant: 'body2' },
        }}
      />
      {/* Actions are absolutely positioned inside LessonActions itself */}
      <LessonActions actions={actions} />
    </ListItem>
  );
}

LessonListItem.propTypes = {
  lessonName: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.element])).isRequired,
  mode: PropTypes.oneOf(['light', 'dark']).isRequired,
};

export default LessonListItem;
