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

  const nameLabel = t('grade.subjectName');

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

export default SubjectFormFields;
