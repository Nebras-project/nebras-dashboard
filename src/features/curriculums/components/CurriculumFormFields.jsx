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

  const nameLabel = t('curriculum.curriculumName');
  const imageLabel = t('curriculum.curriculumImage');
  return (
    <Stack spacing={3} sx={{ ...margin.top.sm }}>
      <Form.TextInput
        name="Name"
        label={nameLabel}
        rules={{ required: t('validation.required', { field: nameLabel }) }}
      />
      {/* Image upload will be added later */}
      <Form.ImageInput name="Image" label={imageLabel} />
    </Stack>
  );
}

export default CurriculumFormFields;
