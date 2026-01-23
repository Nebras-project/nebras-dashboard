import PropTypes from 'prop-types';
import { useTranslation } from '@hooks';
import { Card, CardHeader } from '@mui/material';
import OverviewPieChart from './OverviewPieChart';

import { padding } from '@constants';

function OverviewPieChartContainer({
  data,
  titleKey,
  subheaderKey,
  width = 500,
  height = 300,
  showLegend = true,
  sx = {},
}) {
  const { t } = useTranslation();

  return (
    <Card sx={{ borderRadius: 1, ...padding.all.md, ...sx }}>
      <CardHeader title={t(titleKey)} subheader={t(subheaderKey)} />
      <OverviewPieChart data={data} width={width} height={height} showLegend={showLegend} />
    </Card>
  );
}

OverviewPieChartContainer.propTypes = {
  data: PropTypes.array.isRequired,
  titleKey: PropTypes.string,
  subheaderKey: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  showLegend: PropTypes.bool,
  sx: PropTypes.object,
};

export default OverviewPieChartContainer;
