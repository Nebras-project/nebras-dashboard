import PropTypes from 'prop-types';
import { Stack } from '@mui/material';
import useTranslation from '@i18n/hooks/useTranslation';
import { useLanguage } from '@hooks';
import { dayjs, formatDate } from '@utils';
import CompetitionCardDetailItem from './CompetitionCardDetailItem';

function CompetitionCardDetails({ competition }) {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();

  // Format dates
  const startDate = competition.startDate
    ? formatDate(dayjs(competition.startDate), currentLanguage, 'D MMM YYYY')
    : '-';
  const endDate = competition.endDate
    ? formatDate(dayjs(competition.endDate), currentLanguage, 'D MMM YYYY')
    : '-';

  return (
    <Stack direction="column" spacing={1}>
      {/* Curriculum/Grade */}
      <CompetitionCardDetailItem iconName="school" show={!!competition.curriculum}>
        {competition.curriculum}
      </CompetitionCardDetailItem>

      {/* Dates */}
      <CompetitionCardDetailItem iconName="upcoming">
        {t('common.from')} {startDate} {t('common.to')} {endDate}
      </CompetitionCardDetailItem>

      {/* Manager */}
      <CompetitionCardDetailItem iconName="checkCircle" show={!!competition.manager}>
        {t('competitions.addedByCompetitionManager')} : {competition.manager}
      </CompetitionCardDetailItem>

      {/* Exam Count */}
      <CompetitionCardDetailItem iconName="emojiEvents" show={competition.examCount !== undefined}>
        {competition.examCount} {t('competitions.examCount')}
      </CompetitionCardDetailItem>

      {/* Participants */}
      <CompetitionCardDetailItem iconName="groups" show={competition.participants !== undefined}>
        {competition.participants} {t('competitions.participants')}
      </CompetitionCardDetailItem>
    </Stack>
  );
}

CompetitionCardDetails.propTypes = {
  competition: PropTypes.object.isRequired,
};

export default CompetitionCardDetails;
