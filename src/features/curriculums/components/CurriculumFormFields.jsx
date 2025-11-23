// external imports
import { Stack } from '@mui/material';

// internal imports
import { Form } from '@components';
import { margin } from '@constants';
import { useTranslation } from '@hooks';

/**
 * CurriculumFormFields Component
 *
 * Single Responsibility: Render form fields for curriculum form
 */
function CurriculumFormFields() {
  const { t } = useTranslation();

  const nameArLabel = t('curriculum.curriculumName') + ' (عربي)';
  const nameEnLabel = t('curriculum.curriculumName') + ' (English)';

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
      {/* Image upload will be added later */}
    </Stack>
  );
}

export default CurriculumFormFields;
