// external imports
import { Card, CardContent, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';

// internal imports
import { Icon } from '@components';
import { borderRadius } from '@theme/components';
import { fontWeights } from '@theme/typography';
import { padding } from '@constants';
function StatCard({ icon, count, text, color = 'primary', sx = {} }) {
  return (
    <Card
      variant="elevation"
      sx={{
        height: '100%',
        minWidth: 200,
        position: 'relative',
        ...sx,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
          borderRadius: borderRadius.md,
          bgcolor: (theme) => alpha(theme.palette[color].main, 0.12),
          color: `${color}.main`,
        }}
      >
        <Icon name={icon} size={20} />
      </Box>
      <CardContent sx={{ ...padding.all.lg }}>
        <Box>
          <Typography
            variant="h3"
            fontWeight={fontWeights.bold}
            color="text.primary"
            sx={{ lineHeight: 1.1, mb: 0.5 }}
          >
            {count ?? 0}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: fontWeights.medium }}
          >
            {text}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

StatCard.propTypes = {
  icon: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  sx: PropTypes.object.isRequired,
};

export default StatCard;
