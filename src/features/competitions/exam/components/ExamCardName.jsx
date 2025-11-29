import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import useTranslation from '@i18n/hooks/useTranslation';
import { useLanguage } from '@hooks';
import { getExamName } from '../utils';

function ExamCardName({ exam }) {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();

  const examName = getExamName(exam, currentLanguage);

  return (
    <Typography variant="h4">{examName !== 'N/A' ? examName : t('competitions.exam')}</Typography>
  );
}

ExamCardName.propTypes = {
  exam: PropTypes.object.isRequired,
};

export default ExamCardName;
