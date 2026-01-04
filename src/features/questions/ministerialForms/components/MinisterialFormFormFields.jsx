// external imports
import { Grid } from '@mui/material';
import { useFormContext } from 'react-hook-form';

// internal imports
import { Form } from '@components';
import { margin } from '@constants';
import { useTranslation } from '@hooks';
import { useMinisterialFormFormFields } from '../hooks/useMinisterialFormFormFields';

/**
 * MinisterialFormFormFields Component
 *
 * Single Responsibility: Render form fields for ministerial form
 */
function MinisterialFormFormFields() {
  const { t } = useTranslation();
  const { watch } = useFormContext();

  const formNumberLabel = t('ministerialForms.formNumber');
  const yearLabel = t('ministerialForms.year');

  // Get grade and subject options
  const { gradeOptions, subjectOptions, isLoadingGrades, isLoadingSubjects } =
    useMinisterialFormFormFields();

  // Watch gradeId to enable/disable subject field
  const gradeId = watch('gradeId');

  return (
    <Grid container spacing={2} sx={{ ...margin.top.sm }}>
      <Grid size={{ mobile: 12, tablet: 6 }}>
        <Form.SelectInput
          name="gradeId"
          label={t('grade.grade')}
          options={gradeOptions}
          disabled={isLoadingGrades}
          rules={{ required: t('validation.required', { field: t('grade.grade') }) }}
        />
      </Grid>
      <Grid size={{ mobile: 12, tablet: 6 }}>
        <Form.SelectInput
          name="subjectId"
          label={t('grade.subject')}
          options={subjectOptions}
          disabled={isLoadingSubjects || !gradeId}
          rules={{ required: t('validation.required', { field: t('grade.subject') }) }}
        />
      </Grid>

      <Grid size={{ mobile: 12, tablet: 6 }}>
        <Form.NumberInput
          name="formNumber"
          label={formNumberLabel}
          rules={{ required: t('validation.required', { field: formNumberLabel }) }}
        />
      </Grid>
      <Grid size={{ mobile: 12, tablet: 6 }}>
        <Form.YearInput
          name="year"
          label={yearLabel}
          rules={{ required: t('validation.required', { field: yearLabel }) }}
        />
      </Grid>
    </Grid>
  );
}

export default MinisterialFormFormFields;
