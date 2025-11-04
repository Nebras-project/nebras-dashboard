// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';

// internal imports
import { useTranslation } from '@hooks';
import Message from '../feedback/Message';
import { margin } from '@constants';

const ErrorMessage = memo(function ErrorMessage({ title, description }) {
  const { t } = useTranslation();

  const defaultTitle = t('errors.somethingWentWrong', 'Oops! Something went wrong');
  const defaultDescription = t(
    'errors.errorDescription',
    'We apologize for the inconvenience. An unexpected error has occurred.'
  );

  return (
    <Message
      title={title || defaultTitle}
      message={description || defaultDescription}
      sx={{ ...margin.bottom.lg }}
    />
  );
});

ErrorMessage.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

ErrorMessage.displayName = 'ErrorMessage';

export default ErrorMessage;
