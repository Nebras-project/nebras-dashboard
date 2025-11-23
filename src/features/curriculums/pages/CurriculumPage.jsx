// external imports
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Grid } from '@mui/material';

// internal imports
import { PageLayout, Loader, Message, Icon } from '@components';
import { useTranslation, useLanguage } from '@hooks';
import { useCurriculum } from '../hooks';
import { getCurriculumName } from '../utils';
import CurriculumCardImage from '../components/CurriculumCardImage';
import CurriculumCardStatistics from '../components/CurriculumCardStatistics';

/**
 * CurriculumPage Component
 *
 * Single Responsibility: Display curriculum details page
 */
function CurriculumPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const { curriculum, isLoading } = useCurriculum({ id: parseInt(id, 10) });

  if (isLoading) {
    return (
      <PageLayout title={t('curriculum.curriculumDetails')}>
        <Loader />
      </PageLayout>
    );
  }

  if (!curriculum) {
    return (
      <PageLayout title={t('curriculum.curriculumDetails')}>
        <Message
          title={t('curriculum.curriculumNotFound')}
          content={t('curriculum.curriculumNotFoundDescription')}
          icon="error"
          variant="error"
        />
      </PageLayout>
    );
  }

  const curriculumName = getCurriculumName(curriculum, currentLanguage);
  const imageUrl = curriculum.image || null;

  return (
    <PageLayout title={t('curriculum.viewCurriculum')} description={curriculumName} showBackButton>
      <Grid container spacing={3}>
        {/* Curriculum Image */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: 'background.paper',
            }}
          >
            <Box
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                mb: 2,
              }}
            >
              <CurriculumCardImage imageUrl={imageUrl} alt={curriculumName} />
            </Box>
            <CurriculumCardStatistics
              lessonsCount={curriculum.lessonsCount}
              unitsCount={curriculum.unitsCount}
              studentsCount={curriculum.studentsCount}
            />
          </Paper>
        </Grid>

        {/* Curriculum Details */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              bgcolor: 'background.paper',
            }}
          >
            {/* Description Section */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                {t('curriculum.description')}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {curriculum.description || t('curriculum.noDescription')}
              </Typography>
            </Box>

            {/* Additional Information */}
            <Box>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                {t('curriculum.additionalInfo')}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Icon name="book" size={20} color="primary" />
                    <Typography variant="body2" color="text.secondary">
                      {t('curriculum.lessons')}: {curriculum.lessonsCount || 0}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Icon name="libraryBooks" size={20} color="primary" />
                    <Typography variant="body2" color="text.secondary">
                      {t('curriculum.units')}: {curriculum.unitsCount || 0}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Icon name="people" size={20} color="primary" />
                    <Typography variant="body2" color="text.secondary">
                      {t('students.students')}: {curriculum.studentsCount || 0}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </PageLayout>
  );
}

export default CurriculumPage;
