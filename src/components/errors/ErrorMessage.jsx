// external imports
import { memo } from 'react';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { useTranslation } from '@hooks';
import { margin } from '@constants/spacing';

const ErrorMessage = memo(function ErrorMessage({ title, description }) {
  const { t } = useTranslation();

  const defaultTitle = t('errors.somethingWentWrong', 'Oops! Something went wrong');
  const defaultDescription = t(
    'errors.errorDescription',
    'We apologize for the inconvenience. An unexpected error has occurred.'
  );

  return (
    <>
      <Typography variant="h4" gutterBottom fontWeight="bold" component="h1">
        {title || defaultTitle}
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ ...margin.bottom.xl }}>
        {description || defaultDescription}
      </Typography>
    </>
  );
});

ErrorMessage.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

ErrorMessage.displayName = 'ErrorMessage';

export default ErrorMessage;
