// external imports
import { Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { margin } from '@constants';
import QuestionSettingsFields from './QuestionSettingsFields';
import QuestionMultipleChoice from './QuestionMultipleChoice';
import QuestionTrueFalse from './QuestionTrueFalse';

/**
 * QuestionFormFields Component
 * QuestionFormFields Component
 *
 * Single Responsibility: Render form fields for question form
 */
function QuestionFormFields() {
  const { watch } = useFormContext();
  const type = watch('type');

  return (
    <Stack spacing={3} sx={{ ...margin.top.md }}>
      <QuestionSettingsFields />

      {type === 'multipleChoice' && <QuestionMultipleChoice />}
      {type === 'trueFalse' && <QuestionTrueFalse />}
    </Stack>
  );
}

export default QuestionFormFields;
