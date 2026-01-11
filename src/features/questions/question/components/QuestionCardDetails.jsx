import PropTypes from 'prop-types';
import { Stack, Typography } from '@mui/material';
import { useTranslation } from '@hooks';
import QuestionCardDetailItem from './QuestionCardDetailItem';
import QuestionChoices from './QuestionChoices';
import { SETTINGS_FIELDS, MINISTERIAL_FIELDS } from '../constants';
import { QuestionImage } from '../utils/renderers/QuestionImage';
import { Icon } from '@components';
import { useTheme } from '@mui/material';
/**
 * QuestionCardDetails Component
 *
 * Single Responsibility: Render question details
 */
function QuestionCardDetails({ question }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const renderSetting = ({ key, icon, label }) => {
    const value = question[key];
    if (!value && value !== 0) return null;

    return <QuestionCardDetailItem key={key} iconName={icon} label={t(label)} value={value} />;
  };

  const type = question.type;
  const classValue = question.class;

  return (
    <Stack direction="column" spacing={2}>
      {/* Question Text */}
      <QuestionCardDetailItem
        iconName="questionAnswer"
        label={t('questions.questionText')}
        value={question.text || t('questions.emptyQuestion')}
        show={!!question.text}
      />

      {/* Multiple Choice: Choices - Display in 2 rows, 2 choices per row */}
      {type === 'MultipleChoice' && <QuestionChoices question={question} />}

      {/* True/False: Show available choices as well */}
      {type === 'TrueFalse' && <QuestionChoices question={question} />}

      {/* Question Image */}

      {/* Settings Information */}
      {SETTINGS_FIELDS.map((field) => renderSetting(field))}

      {/* Ministerial Fields */}
      {classValue === 'Ministerial' && MINISTERIAL_FIELDS.map((field) => renderSetting(field))}

      {question.imageUrl && (
        <Stack spacing={3} alignItems="center" justifyContent="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body1" component="span" fontWeight={700}>
              {t('questions.questionImage')}
            </Typography>
            <Icon name="arrowDownLines" color={theme.palette.primary.main} />
          </Stack>

          <QuestionImage image={question.imageUrl} />
        </Stack>
      )}
    </Stack>
  );
}

QuestionCardDetails.propTypes = {
  question: PropTypes.object.isRequired,
};

export default QuestionCardDetails;
