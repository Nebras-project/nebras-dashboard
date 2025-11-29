import PropTypes from 'prop-types';
import { Stack, Typography } from '@mui/material';
import { Card } from '@mui/material';
import { useTranslation } from '@hooks';
import { useReduxTheme } from '@hooks';

import { getCardStyles } from '@constants/layout';
import { margin } from '@constants';
import CompetitionCardDetails from './CompetitionCardDetails';
import CompetitionCardStatus from './CompetitionCardStatus';

function CompetitionInfo({ competition }) {
  const { t } = useTranslation();
  const { mode } = useReduxTheme();

  // Early return if competition is not available
  if (!competition) {
    return null;
  }

  return (
    <Card sx={getCardStyles(mode, margin.bottom.xxxl)}>
      <Stack direction="row" spacing={3} alignItems="center">
        <Typography variant="h5" sx={{ ...margin.bottom.md }}>
          {t('competitions.competitionInfo')}
        </Typography>
        <CompetitionCardStatus competition={competition} />
      </Stack>

      <CompetitionCardDetails competition={competition} />
    </Card>
  );
}

CompetitionInfo.propTypes = {
  competition: PropTypes.object,
};

export default CompetitionInfo;
