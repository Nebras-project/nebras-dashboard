// external imports
import { Stack, Grid } from '@mui/material';

// internal imports
import { Form } from '@components';
import { margin } from '@constants';
import { useTranslation, useLanguage } from '@hooks';
import { useCurriculum } from '@features/curriculums/hooks';
import { getCurriculumName } from '@features/curriculums/utils';

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
  const curriculumOptions = curriculums.map((curriculum) => ({
    value: curriculum.id,
    label: getCurriculumName(curriculum, currentLanguage),
  }));

  const nameArLabel = t('competitions.competitionName') + ' (عربي)';
  const nameEnLabel = t('competitions.competitionName') + ' (English)';

  return (
    <Stack spacing={3} sx={{ ...margin.top.sm }}>
      {/* Competition Name */}
      <Grid container spacing={2}>
        <Grid size={{ mobile: 12, tablet: 6 }}>
          <Form.TextInput
            name="nameAr"
            label={nameArLabel}
            rules={{ required: t('validation.required', { field: nameArLabel }) }}
          />
        </Grid>
        <Grid size={{ mobile: 12, tablet: 6 }}>
          <Form.TextInput
            name="nameEn"
            label={nameEnLabel}
            rules={{ required: t('validation.required', { field: nameEnLabel }) }}
          />
        </Grid>
      </Grid>


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
          <Form.TextInput
            name="startDate"
            label={t('competitions.startDate')}
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            rules={{ required: t('validation.required', { field: t('competitions.startDate') }) }}
          />
        </Grid>
        <Grid size={{ mobile: 12, tablet: 6 }}>
          <Form.TextInput
            name="endDate"
            label={t('competitions.endDate')}
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            rules={{ required: t('validation.required', { field: t('competitions.endDate') }) }}
          />
        </Grid>
      </Grid>

      {/* Duration, Question Count, Passing Score */}
      <Grid container spacing={2}>
        <Grid size={{ mobile: 12, tablet: 4 }}>
          <Form.TextInput
            name="duration"
            label={t('competitions.duration') + ' (' + t('competitions.minutes') + ')'}
            type="number"
            inputProps={{ min: 1 }}
            rules={{
              required: t('validation.required', { field: t('competitions.duration') }),
              min: {
                value: 1,
                message: t('validation.min', { field: t('competitions.duration'), min: 1 }),
              },
            }}
          />
        </Grid>
        <Grid size={{ mobile: 12, tablet: 4 }}>
          <Form.TextInput
            name="questionCount"
            label={t('competitions.questionCount')}
            type="number"
            inputProps={{ min: 1 }}
            rules={{
              required: t('validation.required', { field: t('competitions.questionCount') }),
              min: {
                value: 1,
                message: t('validation.min', { field: t('competitions.questionCount'), min: 1 }),
              },
            }}
          />
        </Grid>
        <Grid size={{ mobile: 12, tablet: 4 }}>
          <Form.TextInput
            name="passingScore"
            label={t('competitions.passingScore')}
            type="number"
            inputProps={{ min: 0, max: 100 }}
            rules={{
              required: t('validation.required', { field: t('competitions.passingScore') }),
              min: {
                value: 0,
                message: t('validation.min', { field: t('competitions.passingScore'), min: 0 }),
              },
              max: {
                value: 100,
                message: t('validation.max', { field: t('competitions.passingScore'), max: 100 }),
              },
            }}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}

export default CompetitionFormFields;
