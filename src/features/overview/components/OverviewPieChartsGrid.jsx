import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import OverviewPieChartContainer from './OverviewPieChartContainer';

function OverviewPieChartsGrid({ spacing = 3, mt = 5, pies = [] }) {
  return (
    <Grid container spacing={spacing} mt={mt}>
      {pies.map((pie, idx) => (
        <Grid key={pie.titleKey || pie.subheaderKey || idx} size={{ mobile: 12, desktop: 6 }}>
          <OverviewPieChartContainer {...pie} />
        </Grid>
      ))}
    </Grid>
  );
}

OverviewPieChartsGrid.propTypes = {
  spacing: PropTypes.number,
  mt: PropTypes.number,
  pies: PropTypes.arrayOf(PropTypes.object),
};

export default OverviewPieChartsGrid;
