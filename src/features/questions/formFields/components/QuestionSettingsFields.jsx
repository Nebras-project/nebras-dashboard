// external imports
import { Paper, Stack, Grid, Typography } from '@mui/material';
import { useTranslation, useReduxTheme } from '@hooks';

// internal imports
import { Form } from '@components';
import { useQuestionSettingsFields } from '../hooks/useQuestionSettingsFields';
import { getNumberRules, getYearRules } from '@components/forms/constants';
import { QUESTION_FORM_CARD_STYLES } from '../../constants';

/**
 * QuestionSettingsFields Component
 *
 * Single Responsibility: Render shared settings fields for question form
 * Fields: type, category, curriculum, subject, unit, lesson, year, form
 */
function QuestionSettingsFields() {
  const { t } = useTranslation();
  const { mode } = useReduxTheme();
  const {
    curriculumId,
    subjectId,
    unitId,
    isMinisterial,
    curriculumOptions,
    subjectOptions,
    unitOptions,
    lessonOptions,
    isLoadingCurriculums,
    isLoadingSubjects,
    isLoadingUnits,
    isLoadingLessons,
    typeOptions,
    categoryOptions,
  } = useQuestionSettingsFields();

  return (
    <Paper sx={QUESTION_FORM_CARD_STYLES(mode)} elevation={0}>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
        {t('questions.settings')}
      </Typography>

      <Stack spacing={1}>
        {/* Type and Category */}
        <Grid container spacing={2}>
          <Grid size={{ mobile: 12, tablet: 6 }}>
            <Form.SelectInput
              name="Type"
              label={t('questions.questionType')}
              options={typeOptions}
              rules={{ required: t('validation.required', { field: t('questions.questionType') }) }}
            />
          </Grid>
          <Grid size={{ mobile: 12, tablet: 6 }}>
            <Form.SelectInput
              name="Category"
              label={t('questions.category')}
              options={categoryOptions}
              rules={{ required: t('validation.required', { field: t('questions.category') }) }}
            />
          </Grid>
        </Grid>

        {/* Curriculum and Subject */}
        <Grid container spacing={2}>
          <Grid size={{ mobile: 12, tablet: 6 }}>
            <Form.SelectInput
              name="CurriculumId"
              label={t('questions.curriculum')}
              options={curriculumOptions}
              disabled={isLoadingCurriculums}
              loading={isLoadingCurriculums}
              rules={{ required: t('validation.required', { field: t('questions.curriculum') }) }}
            />
          </Grid>
          <Grid size={{ mobile: 12, tablet: 6 }}>
            <Form.SelectInput
              name="SubjectId"
              label={t('questions.subject')}
              options={subjectOptions}
              disabled={isLoadingSubjects || !curriculumId}
              loading={isLoadingSubjects}
              rules={{ required: t('validation.required', { field: t('questions.subject') }) }}
            />
          </Grid>
        </Grid>

        {/* Unit and Lesson */}
        <Grid container spacing={2}>
          <Grid size={{ mobile: 12, tablet: 6 }}>
            <Form.SelectInput
              name="UnitId"
              label={t('questions.unit')}
              options={unitOptions}
              disabled={isLoadingUnits || !curriculumId || !subjectId}
              loading={isLoadingUnits}
              rules={{ required: t('validation.required', { field: t('questions.unit') }) }}
            />
          </Grid>
          <Grid size={{ mobile: 12, tablet: 6 }}>
            <Form.SelectInput
              name="LessonId"
              label={t('questions.lesson')}
              options={lessonOptions}
              disabled={isLoadingLessons || !curriculumId || !subjectId || !unitId}
              loading={isLoadingLessons}
              rules={{ required: t('validation.required', { field: t('questions.lesson') }) }}
            />
          </Grid>
        </Grid>

        {/* Year and Form - Only show for ministerial category */}
        {isMinisterial && (
          <Grid container spacing={2}>
            <Grid size={{ mobile: 12, tablet: 6 }}>
              <Form.YearInput
                name="Year"
                label={t('questions.year')}
                rules={getYearRules(t, t('questions.year'), true)}
              />
            </Grid>
            <Grid size={{ mobile: 12, tablet: 6 }}>
              <Form.NumberInput
                name="FormNumber"
                label={t('questions.formNumber')}
                maxLength={2}
                rules={getNumberRules(t, t('questions.formNumber'), {
                  min: 1,
                  max: 99,
                })}
              />
            </Grid>
          </Grid>
        )}
      </Stack>
    </Paper>
  );
}

export default QuestionSettingsFields;
