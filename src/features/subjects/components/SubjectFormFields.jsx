// external imports
import { Stack } from '@mui/material';

// internal imports
import { Form } from '@components';
import { margin } from '@constants';
import { useTranslation } from '@hooks';

/**
 * SubjectFormFields Component
 *
 * Single Responsibility: Render form fields for subject form
 */
function SubjectFormFields() {
  const { t } = useTranslation();

  const nameArLabel = t('grade.subjectName') + ' (عربي)';
  const nameEnLabel = t('grade.subjectName') + ' (English)';

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

export default SubjectFormFields;
