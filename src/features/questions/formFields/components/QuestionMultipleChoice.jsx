// external imports
import { Paper, Stack, Typography } from '@mui/material';
import { useTranslation, useReduxTheme } from '@hooks';
import { RadioTextInputGroup } from '@components/forms/inputs';

// internal imports
import { Form } from '@components';
import { QUESTION_FORM_CARD_STYLES } from '../../constants';
import { margin } from '@constants';
import { getTextRules, getRadioRules } from '@components/forms/constants';
import { getQuestionChoices } from '../../constants';
import { useQuestionSettingsFields } from '../hooks/useQuestionSettingsFields';

/**
 * QuestionMultipleChoice Component (MQC)
 *
 * Single Responsibility: Render form fields for multiple choice questions
 * Includes: question text, question image, and answer choices
 */
function QuestionMultipleChoice() {
  const { t } = useTranslation();
  const { mode } = useReduxTheme();
  const choices = getQuestionChoices(t);
  const { subjectId, subjectOptions } = useQuestionSettingsFields();

  return (
    <Paper sx={QUESTION_FORM_CARD_STYLES(mode)} elevation={0}>
      <Typography variant="h6" fontWeight={600} sx={{ ...margin.bottom.md }}>
        {t('questions.multipleChoice')}
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

        {/* Question Image */}
        <Form.ImageInput
          name="questionImage"
          label={t('questions.questionImage')}
          rules={{ required: false }}
        />

        {/* Answer Choices */}
        <RadioTextInputGroup
          name="correctAnswer"
          label={t('questions.correctChoice')}
          choices={choices}
          rules={getRadioRules(t, t('questions.correctChoice'), true)}
          showSymbolsButton={true}
          subjectId={subjectId}
          subjectOptions={subjectOptions}
        />
      </Stack>
    </Paper>
  );
}

export default QuestionMultipleChoice;
