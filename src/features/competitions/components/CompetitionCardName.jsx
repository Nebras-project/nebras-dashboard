import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import useTranslation from '@i18n/hooks/useTranslation';

function CompetitionCardName({ competition }) {
  const { t } = useTranslation();

  return <Typography variant="h4">{competition.name || t('competitions.competition')}</Typography>;
}

CompetitionCardName.propTypes = {
  competition: PropTypes.object.isRequired,
};

export default CompetitionCardName;
