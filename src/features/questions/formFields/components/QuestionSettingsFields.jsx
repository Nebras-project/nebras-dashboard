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
 * Fields: type, category, grade, subject, unit, lesson, year, form
 */
function QuestionSettingsFields() {
  const { t } = useTranslation();
  const { mode } = useReduxTheme();
  const {
    gradeId,
    subjectId,
    unitId,
    isMinisterial,
    gradeOptions,
    subjectOptions,
    unitOptions,
    lessonOptions,
    isLoadingGrades,
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
              name="type"
              label={t('questions.questionType')}
              options={typeOptions}
              rules={{ required: t('validation.required', { field: t('questions.questionType') }) }}
            />
          </Grid>
          <Grid size={{ mobile: 12, tablet: 6 }}>
            <Form.SelectInput
              name="category"
              label={t('questions.category')}
              options={categoryOptions}
              rules={{ required: t('validation.required', { field: t('questions.category') }) }}
            />
          </Grid>
        </Grid>

        {/* Grade and Subject */}
        <Grid container spacing={2}>
          <Grid size={{ mobile: 12, tablet: 6 }}>
            <Form.SelectInput
              name="gradeId"
              label={t('grade.grade')}
              options={gradeOptions}
              disabled={isLoadingGrades}
              loading={isLoadingGrades}
              rules={{ required: t('validation.required', { field: t('grade.grade') }) }}
            />
          </Grid>
          <Grid size={{ mobile: 12, tablet: 6 }}>
            <Form.SelectInput
              name="subjectId"
              label={t('questions.subject')}
              options={subjectOptions}
              disabled={isLoadingSubjects || !gradeId}
              loading={isLoadingSubjects}
              rules={{ required: t('validation.required', { field: t('questions.subject') }) }}
            />
          </Grid>
        </Grid>

        {/* Unit and Lesson */}
        <Grid container spacing={2}>
          <Grid size={{ mobile: 12, tablet: 6 }}>
            <Form.SelectInput
              name="unitId"
              label={t('questions.unit')}
              options={unitOptions}
              disabled={isLoadingUnits || !gradeId || !subjectId}
              loading={isLoadingUnits}
              rules={{ required: t('validation.required', { field: t('questions.unit') }) }}
            />
          </Grid>
          <Grid size={{ mobile: 12, tablet: 6 }}>
            <Form.SelectInput
              name="lessonId"
              label={t('questions.lesson')}
              options={lessonOptions}
              disabled={isLoadingLessons || !gradeId || !subjectId || !unitId}
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
                name="year"
                label={t('questions.year')}
                rules={getYearRules(t, t('questions.year'), true)}
              />
            </Grid>
            <Grid size={{ mobile: 12, tablet: 6 }}>
              <Form.NumberInput
                name="formNumber"
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
