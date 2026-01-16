import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Icon } from '@components';
import { borderRadius } from '@theme/components';

function StatIcon({ icon, color = 'primary' }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 12,
        right: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 45,
        height: 45,
        borderRadius: borderRadius.md,
        bgcolor: (theme) => alpha(theme.palette[color].main, 0.2),
        color: `${color}.main`,
      }}
    >
      <Icon name={icon} size={20} />
    </Box>
  );
}

StatIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default StatIcon;
