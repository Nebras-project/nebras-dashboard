// external imports
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { Card, Icon, BackButton } from '@components';
import { padding, margin } from '@constants';
import { useTranslation } from '@hooks';

/**
 * EntityErrorState Component
 *
 * Single Responsibility: Display error state when entity data cannot be fetched
 * Generic component that can be used for any entity (admins, students, etc.)
 *
 * @param {string} entityName - Entity name for translations (e.g., 'admins', 'students')
 */
function EntityErrorState({ entityName = 'items' }) {
  const { t } = useTranslation();

  return (
    <Card>
      <Box sx={{ textAlign: 'center', ...padding.all.lg }}>
        <Icon name="error" color="error" size={64} sx={{ ...margin.bottom.md }} />
        <Typography variant="h6" color="error" sx={{ ...margin.bottom.lg }}>
          {t('common.fetchErrorMessage', { entityName: t(`${entityName}.entityName`) })}
        </Typography>
        <BackButton sx={{ minWidth: '150px' }} />
      </Box>
    </Card>
  );
}

EntityErrorState.propTypes = {
  entityName: PropTypes.string,
};

export default EntityErrorState;
