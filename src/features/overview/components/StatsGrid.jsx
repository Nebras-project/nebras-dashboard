import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import StatCard from './StatCard';
import { useNavigate } from 'react-router-dom';

function StatsGrid({ counters = [], t, spacing = 3 }) {
  const navigate = useNavigate();

  const handleStatCardClick = (path) => navigate(path);

  return (
    <Grid container spacing={spacing} justifyContent="center">
      {counters.map((counter, idx) => (
        <Grid key={counter.counterKey || idx} size={{ mobile: 12, tablet: 6, desktop: 2 }}>
          <StatCard
            icon={counter.icon}
            count={counter.counter ?? 0}
            text={t ? t(counter.text) : counter.text}
            color={counter.color}
            onClick={() => handleStatCardClick(counter.path)}
          />
        </Grid>
      ))}
    </Grid>
  );
}

StatsGrid.propTypes = {
  counters: PropTypes.arrayOf(
    PropTypes.shape({
      counterKey: PropTypes.string,
      icon: PropTypes.string.isRequired,
      counter: PropTypes.number,
      text: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ),
  t: PropTypes.func,
  spacing: PropTypes.number,
};

export default StatsGrid;
