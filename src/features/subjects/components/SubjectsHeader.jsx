import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { Icon, ActionsMenu } from '@components';
import { useTranslation, useReduxTheme } from '@hooks';
import { getActionsButtonStyles } from '@constants/layout';

/**
 * SubjectsHeader Component
 *
 * Single Responsibility: Display header with title and add button for subjects
 */
function SubjectsHeader({ onAdd }) {
  const { t } = useTranslation();
  const { isLight } = useReduxTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
      }}
    >
      <Typography variant="h6" fontWeight={600}>
        {t('grade.subjects')}
      </Typography>

      {onAdd && (
        <ActionsMenu
          actions={[
            {
              label: t('grade.addSubject'),
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

SubjectsHeader.propTypes = {
  onAdd: PropTypes.func,
};

SubjectsHeader.defaultProps = {
  onAdd: null,
};

export default SubjectsHeader;
