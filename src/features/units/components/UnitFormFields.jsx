// external imports
import { Stack } from '@mui/material';

// internal imports
import { Form } from '@components';
import { margin } from '@constants';
import { useTranslation } from '@hooks';

function UnitFormFields() {
  const { t } = useTranslation();

  const nameArLabel = `${t('grade.unitName')} (عربي)`;
  const nameEnLabel = `${t('grade.unitName')} (English)`;

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

export default UnitFormFields;
