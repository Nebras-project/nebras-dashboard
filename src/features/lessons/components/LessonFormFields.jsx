// external imports
import { Stack } from '@mui/material';

// internal imports
import { Form } from '@components';
import { margin } from '@constants';
import { useTranslation } from '@hooks';

function LessonFormFields() {
  const { t } = useTranslation();

  const nameArLabel = `${t('curriculum.lessonName')} (عربي)`;
  const nameEnLabel = `${t('curriculum.lessonName')} (English)`;

  return (
    <Stack spacing={3} sx={{ ...margin.top.sm }}>
      <Form.TextInput
        name="nameAr"
        label={nameArLabel}
        rules={{ required: t('validation.required', { field: nameArLabel }) }}
      />
      <Form.TextInput
        name="nameEn"
        label={nameEnLabel}
        rules={{ required: t('validation.required', { field: nameEnLabel }) }}
      />
    </Stack>
  );
}

export default LessonFormFields;
