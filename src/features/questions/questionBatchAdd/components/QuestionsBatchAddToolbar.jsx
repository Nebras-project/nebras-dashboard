import PropTypes from 'prop-types';
import { Stack, Box, Paper, Typography } from '@mui/material';
import { useTranslation, useReduxTheme } from '@hooks';
import { IconButtonWithTooltip } from '@components';
import { QUESTION_FORM_CARD_STYLES } from '../../constants';
import { useResponsive } from '@hooks';

/**
 * QuestionsBatchAddToolbar Component
 *
 * Single Responsibility: Render toolbar UI for batch adding questions
 */
function QuestionsBatchAddToolbar({ onAddQuestion, onViewAll, savedQuestionsCount }) {
  const { t } = useTranslation();
  const { mode } = useReduxTheme();
  const { isSmallScreen } = useResponsive();
  return (
    <Paper sx={QUESTION_FORM_CARD_STYLES(mode)} elevation={0}>
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButtonWithTooltip
            iconName="addToQueue"
            tooltip={isSmallScreen ? t('questions.addAnotherQuestion') : undefined}
            onClick={onAddQuestion}
            text={t('questions.addAnotherQuestion')}
          />
          {savedQuestionsCount > 0 && (
            <Box sx={{ position: 'relative' }}>
              <IconButtonWithTooltip
                iconName="thListOutline"
                tooltip={
                  isSmallScreen
                    ? `${t('questions.viewAllQuestions')} (${savedQuestionsCount})`
                    : undefined
                }
                onClick={onViewAll}
                text={t('questions.viewAllQuestions')}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  color: 'primary.main',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                {savedQuestionsCount}
              </Box>
            </Box>
          )}
        </Box>

        <Typography variant="body2" color="text.secondary">
          {t('questions.questionsReady', { count: savedQuestionsCount })}
        </Typography>
      </Stack>
    </Paper>
  );
}

QuestionsBatchAddToolbar.propTypes = {
  onAddQuestion: PropTypes.func.isRequired,
  onViewAll: PropTypes.func.isRequired,
  savedQuestionsCount: PropTypes.number.isRequired,
};

export default QuestionsBatchAddToolbar;
