// external imports
import { Stack } from '@mui/material';

// internal imports
import { Form } from '@components';
import { margin } from '@constants';
import { useTranslation } from '@hooks';

function LessonFormFields() {
  const { t } = useTranslation();

  const nameLabel = `${t('grade.lessonName')}`;

  return (
    <Stack spacing={3} sx={{ ...margin.top.sm }}>
      <Form.TextInput
        name="name"
        label={nameLabel}
        rules={{ required: t('validation.required', { field: nameLabel }) }}
      />
    </Stack>
  );
}

export default LessonFormFields;
