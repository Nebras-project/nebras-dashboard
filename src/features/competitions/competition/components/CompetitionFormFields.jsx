// external imports
import { Stack, Grid } from '@mui/material';

// internal imports
import { Form } from '@components';
import { margin } from '@constants';
import { useTranslation, useLanguage } from '@hooks';
import { useGrade } from '@features/grades/hooks';
import { getGradeOptions } from '@features/grades/utils';
import { getTextRules, getStartDateRules, getEndDateRules } from '@components/forms/constants';

/**
 * CompetitionFormFields Component
 *
 * Single Responsibility: Render form fields for competition form
 */
function CompetitionFormFields() {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const { grades = [], isLoading: isLoadingGrades } = useGrade();

  // Build grade options for select
  const gradeOptions = getGradeOptions(grades, currentLanguage);

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

      {/* Grade Selection */}
      <Form.SelectInput
        name="gradeId"
        label={t('grade.grade')}
        options={gradeOptions}
        disabled={isLoadingGrades}
        rules={{ required: t('validation.required', { field: t('grade.grade') }) }}
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
