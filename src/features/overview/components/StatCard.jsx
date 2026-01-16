// external imports
import { Card, CardContent, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';

// internal imports
import { fontWeights } from '@theme/typography';
import { padding } from '@constants';
import StatIcon from './StatIcon';

function StatCard({ icon, count = 0, text, onClick, color = 'primary', sx = {} }) {
  return (
    <Card
      variant="elevation"
      onClick={onClick}
      sx={{
        height: '100%',
        minWidth: 200,
        position: 'relative',
        borderRadius: 1,
        cursor: 'pointer',
        ...sx,
      }}
    >
      <StatIcon icon={icon} color={color} />

      <CardContent sx={{ ...padding.all.lg }}>
        <Box>
          <Typography variant="h3" fontWeight={fontWeights.bold} color="text.primary">
            <CountUp end={count ?? 0} duration={4} separator="," preserveValue />
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={fontWeights.medium}>
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
  onClick: PropTypes.func,
  color: PropTypes.string.isRequired,
  sx: PropTypes.object,
};

export default StatCard;
