import PropTypes from 'prop-types';
import { Stack } from '@mui/material';
import useTranslation from '@i18n/hooks/useTranslation';
import { useLanguage } from '@hooks';
import { dayjs, formatDate } from '@utils';
import CompetitionCardDetailItem from '../../competition/components/CompetitionCardDetailItem';

function ExamCardDetails({ exam }) {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();

  // Format date
  const examDate = exam.date ? formatDate(dayjs(exam.date), currentLanguage, 'D MMM YYYY') : '-';

  // Get unit name based on language
  const unitName = currentLanguage === 'ar' ? exam.unitAr || exam.unit : exam.unitEn || exam.unit;

  // Calculate total questions
  const multipleChoiceCount = exam.multipleChoiceCount || 0;
  const trueFalseCount = exam.trueFalseCount || 0;
  const totalQuestions = multipleChoiceCount + trueFalseCount;

  return (
    <Stack direction="column" spacing={1}>
      {/* Curriculum */}
      <CompetitionCardDetailItem iconName="school" show={!!exam.curriculum}>
        {exam.curriculum}
      </CompetitionCardDetailItem>

      <Stack direction="row" spacing={1}>
        {/* Date */}
        <CompetitionCardDetailItem iconName="calendarToday" show={!!exam.date}>
          {examDate}
        </CompetitionCardDetailItem>

        {/* Time */}
        <CompetitionCardDetailItem iconName="accessTime" show={!!exam.startTime && !!exam.endTime}>
          {exam.startTime} - {exam.endTime}
        </CompetitionCardDetailItem>
      </Stack>

      {/* Questions Count */}
      <Stack direction="row" spacing={1}>
        <CompetitionCardDetailItem iconName="quiz" show={exam.multipleChoiceCount !== undefined}>
          {multipleChoiceCount} {t('competitions.multipleChoice')}
        </CompetitionCardDetailItem>

        <CompetitionCardDetailItem iconName="checkCircle" show={exam.trueFalseCount !== undefined}>
          {trueFalseCount} {t('competitions.trueFalse')}
        </CompetitionCardDetailItem>

        <CompetitionCardDetailItem
          iconName="libraryBooks"
          show={exam.multipleChoiceCount !== undefined || exam.trueFalseCount !== undefined}
        >
          ({totalQuestions} {t('competitions.questionCount')})
        </CompetitionCardDetailItem>
      </Stack>

      {/* Unit */}
      <CompetitionCardDetailItem iconName="menuBook" show={!!unitName}>
        {unitName}
      </CompetitionCardDetailItem>
    </Stack>
  );
}

ExamCardDetails.propTypes = {
  exam: PropTypes.object.isRequired,
};

export default ExamCardDetails;
