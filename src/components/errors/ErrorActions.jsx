// external imports
import { memo, useCallback } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import Button from '../inputs/Button';
import Icon from '../display/Icon';
import { useTranslation } from '@hooks';
import { gap } from '@constants/spacing';

// Style Getters
const getActionsContainerStyles = () => ({
  display: 'flex',
  ...gap.md,
  justifyContent: 'center',
  flexWrap: 'wrap',
});

const ErrorActions = memo(function ErrorActions({ onReset, homeRoute = '/' }) {
  const { t } = useTranslation();

  const handleGoHome = useCallback(() => {
    onReset();
    window.location.href = homeRoute;
  }, [homeRoute, onReset]);

  return (
    <Box sx={getActionsContainerStyles()}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Icon name="refresh" />}
        onClick={onReset}
        aria-label={t('errors.tryAgain', 'Try Again')}
      >
        {t('errors.tryAgain', 'Try Again')}
      </Button>

      <Button
        variant="outlined"
        color="primary"
        startIcon={<Icon name="home" />}
        onClick={handleGoHome}
        aria-label={t('errors.goHome', 'Go to Home')}
      >
        {t('errors.goHome', 'Go to Home')}
      </Button>
    </Box>
  );
});

ErrorActions.propTypes = {
  onReset: PropTypes.func.isRequired,
  homeRoute: PropTypes.string,
};

ErrorActions.displayName = 'ErrorActions';

export default ErrorActions;
