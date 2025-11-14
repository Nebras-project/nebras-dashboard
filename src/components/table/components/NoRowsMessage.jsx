import PropTypes from 'prop-types';
import { Box } from '@mui/material';

import { gap, padding, margin } from '@constants';
import { fontWeights } from '@theme';
import { Message } from '@components';

const getContainerSx = () => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  textAlign: 'center',
  ...gap.md,
  ...padding.x.lg,
  ...padding.y.xl,
});

const getMessageSx = () => ({
  textAlign: 'center',
  color: (theme) => theme.palette.text.secondary,
  '& .MuiTypography-h4': {
    fontSize: '1.1rem',
    fontWeight: fontWeights.semiBold,
    ...margin.bottom.sm,
  },
});

function NoRowsMessage({ title, description, messageProps, children } = {}) {
  return (
    <Box role="status" aria-live="polite" sx={getContainerSx()}>
      <Message title={title} content={description} sx={getMessageSx()} {...messageProps} />
      {children}
    </Box>
  );
}

NoRowsMessage.propTypes = {
  title: PropTypes.string,
  description: PropTypes.node,
  messageProps: PropTypes.object,
  children: PropTypes.node,
};

export default NoRowsMessage;
