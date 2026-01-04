// external imports
import { Paper, Stack, Typography } from '@mui/material';
import { useTranslation, useReduxTheme } from '@hooks';

// internal imports
import { Form } from '@components';
import { margin } from '@constants';
import { QUESTION_FORM_CARD_STYLES } from '../../question/constants';
import { getTextRules, getRadioRules } from '@components/forms/constants';
import { getTrueFalseOptions } from '../../question/constants';
import { useQuestionSettingsFields } from '../hooks/useQuestionSettingsFields';
/**
 * QuestionTrueFalse Component (T/F)
 *
 * Single Responsibility: Render form fields for true/false questions
 * Includes: question text and true/false radio buttons
 */
function QuestionTrueFalse() {
  const { t } = useTranslation();
  const { mode } = useReduxTheme();
  const { subjectId, subjectOptions } = useQuestionSettingsFields();

  const trueFalseOptions = getTrueFalseOptions(t);

  return (
    <Paper sx={QUESTION_FORM_CARD_STYLES(mode)} elevation={0}>
      <Typography variant="h6" fontWeight={600} sx={{ ...margin.bottom.md }}>
        {t('questions.trueFalse')}
      </Typography>

      <Stack spacing={2}>
        {/* Question Text */}
        <Form.MathSymbolsInput
          name="question"
          label={t('questions.questionText')}
          rules={getTextRules(t, t('questions.questionText'), { required: true, minLength: 15 })}
          multiline
          rows={2}
          subjectId={subjectId}
          subjectOptions={subjectOptions}
        />

        <Form.ImageInput
          name="questionImage"
          label={t('questions.questionImage')}
          rules={{ required: false }}
        />

        {/* True/False Radio Buttons */}
        <Form.RadioInput
          name="correctAnswer"
          label={t('questions.correctAnswer')}
          options={trueFalseOptions}
          rules={getRadioRules(t, t('questions.correctAnswer'), true)}
        />
      </Stack>
    </Paper>
  );
}

export default QuestionTrueFalse;
