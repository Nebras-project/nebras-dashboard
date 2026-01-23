import { PieChart } from '@mui/x-charts/PieChart';
import PropTypes from 'prop-types';

function OverviewPieChart({ data = [],height = 400, showLegend = true }) {
  return (
    <PieChart
      series={[
        {
          data,
          innerRadius: 90,
          paddingAngle: 1,
          cornerRadius: 5,
        },
      ]}
      height={height}
      slotProps={{ legend: { hidden: !showLegend } }}
    />
  );
}

OverviewPieChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  showLegend: PropTypes.bool,
};

export default OverviewPieChart;
