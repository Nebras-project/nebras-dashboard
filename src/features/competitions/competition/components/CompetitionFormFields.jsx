// external imports
import { Stack, Grid } from '@mui/material';

// internal imports
import { Form } from '@components';
import { margin } from '@constants';
import { useTranslation, useLanguage } from '@hooks';
import { useCurriculum } from '@features/curriculums/hooks';
import { getCurriculumOptions } from '@features/curriculums/utils';
import { getTextRules, getStartDateRules, getEndDateRules } from '@components/forms/constants';

/**
 * CompetitionFormFields Component
 *
 * Single Responsibility: Render form fields for competition form
 */
function CompetitionFormFields() {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const { curriculums = [], isLoading: isLoadingCurriculums } = useCurriculum();

  // Build curriculum options for select
  const curriculumOptions = getCurriculumOptions(curriculums, currentLanguage);

  const competitionNameLabel = t('competitions.competitionName');
  const startDateLabel = t('competitions.startDate');
  const endDateLabel = t('competitions.endDate');

  return (
    <Stack spacing={3} sx={{ ...margin.top.md }}>
      {/* Competition Name */}
      <Form.TextInput
        name="name"
        label={competitionNameLabel}
        rules={getTextRules(t, competitionNameLabel, { minLength: 8 })}
      />

      {/* Curriculum Selection */}
      <Form.SelectInput
        name="curriculumId"
        label={t('curriculum.curriculum')}
        options={curriculumOptions}
        disabled={isLoadingCurriculums}
        rules={{ required: t('validation.required', { field: t('curriculum.curriculum') }) }}
      />

      {/* Dates */}
      <Grid container spacing={2}>
        <Grid size={{ mobile: 12, tablet: 6 }}>
          <Form.DateInput
            name="startDate"
            label={startDateLabel}
            rules={getStartDateRules(t, startDateLabel, 'endDate', endDateLabel)}
          />
        </Grid>
        <Grid size={{ mobile: 12, tablet: 6 }}>
          <Form.DateInput
            name="endDate"
            label={endDateLabel}
            rules={getEndDateRules(t, endDateLabel, 'startDate', startDateLabel)}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}

export default CompetitionFormFields;
