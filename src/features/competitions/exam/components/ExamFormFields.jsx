// external imports
import { Stack, Grid } from '@mui/material';

// internal imports
import { Form } from '@components';
import { margin } from '@constants';
import { useTranslation } from '@hooks';
import { useExamFormFields } from '../hooks';
import { getNumberRules, getTimeRules } from '@components/forms/constants';

/**
 * ExamFormFields Component
 *
 * Single Responsibility: Render form fields for exam form
 */
function ExamFormFields() {
  const { t } = useTranslation();
  
  const { curriculumName, subjectOptions, isLoadingSubjects, competitionCurriculumId } =
    useExamFormFields();

  return (
    <Stack spacing={3} sx={{ ...margin.top.sm }}>
      {/* Curriculum - Display only (from competition) */}
      {/* Hidden field to store curriculumId for form submission */}
      <Form.TextInput name="curriculumId" sx={{ display: 'none' }} />
      {/* Display field for curriculum name */}
      <Form.TextInput
        name="curriculumDisplay"
        label={t('curriculum.curriculum')}
        value={curriculumName}
        disabled={true}
        InputProps={{
          readOnly: true,
        }}
      />

      {/* Subject Name */}
      <Form.SelectInput
        name="subjectId"
        label={t('curriculum.subjectName')}
        options={subjectOptions}
        disabled={isLoadingSubjects || !competitionCurriculumId}
        rules={{ required: t('validation.required', { field: t('curriculum.subjectName') }) }}
      />

      {/* Date */}
      <Form.DateInput
        name="date"
        label={t('competitions.examDate')}
        rules={{ required: t('validation.required', { field: t('competitions.examDate') }) }}
      />

      <Grid container spacing={2}>
        {/* True/False Questions */}
        <Grid size={{ mobile: 12, desktop: 6 }}>
          <Form.NumberInput
            name="trueFalseCount"
            label={t('competitions.trueFalseCount')}
            rules={getNumberRules(t, t('competitions.trueFalseCount'), { min: 1 })}
          />
        </Grid>

        {/* Multiple Choice Questions */}
        <Grid size={{ mobile: 12, desktop: 6 }}>
          <Form.NumberInput
            name="multipleChoiceCount"
            label={t('competitions.multipleChoiceCount')}
            rules={getNumberRules(t, t('competitions.multipleChoiceCount'), { min: 1, max: 30 })}
          />
        </Grid>
      </Grid>

      {/* Start Time and End Time */}
      <Grid container spacing={2}>
        <Grid size={{ mobile: 12, desktop: 6 }}>
          <Form.TimeInput
            name="startTime"
            label={t('competitions.startTime')}
            rules={getTimeRules(t, t('competitions.startTime'), {
              compareTimeFieldName: 'endTime',
              compareTimeLabel: t('competitions.endTime'),
              comparisonType: 'before',
            })}
          />
        </Grid>

        <Grid size={{ mobile: 12, desktop: 6 }}>
          <Form.TimeInput
            name="endTime"
            label={t('competitions.endTime')}
            rules={getTimeRules(t, t('competitions.endTime'), {
              compareTimeFieldName: 'startTime',
              compareTimeLabel: t('competitions.startTime'),
              comparisonType: 'after',
            })}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}

export default ExamFormFields;
