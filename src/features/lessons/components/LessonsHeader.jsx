// external imports
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { Icon, ActionsMenu } from '@components';
import { useTranslation, useReduxTheme } from '@hooks';
import { getActionsButtonStyles } from '@constants/layout';

/**
 * LessonsHeader Component
 *
 * Single Responsibility: Display header with title and add button for lessons
 */
function LessonsHeader({ onAdd = null }) {
  const { t } = useTranslation();
  const { isLight } = useReduxTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 1.5,
      }}
    >
      <Typography variant="subtitle2" fontWeight={600} color="text.secondary">
        {t('grade.lessons')}
      </Typography>

      {onAdd && (
        <ActionsMenu
          actions={[
            {
              label: t('grade.addLesson'),
              icon: <Icon name="add" size={18} />,
              onClick: onAdd,
            },
          ]}
          iconButtonProps={{
            size: 'small',
            sx: getActionsButtonStyles(isLight),
          }}
          checkPermissions={false}
        />
      )}
    </Box>
  );
}

LessonsHeader.propTypes = {
  onAdd: PropTypes.func,
};

export default LessonsHeader;
