import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import useTranslation from '@i18n/hooks/useTranslation';
import { useLanguage } from '@hooks';
import { getCompetitionName } from '../utils';

function CompetitionCardName({ competition }) {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();

  const competitionName = getCompetitionName(competition, currentLanguage);

  return (
    <Typography variant="h4">
      {competitionName !== 'N/A' ? competitionName : t('competitions.competition')}
    </Typography>
  );
}

CompetitionCardName.propTypes = {
  competition: PropTypes.object.isRequired,
};

export default CompetitionCardName;
