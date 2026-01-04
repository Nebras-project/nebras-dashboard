import PropTypes from 'prop-types';
import { Typography, Chip, useTheme, Stack } from '@mui/material';
import { useTranslation, useLanguage } from '@hooks';
import { getCorrectAnswerLabel } from '../utils';
import { Icon } from '@components';
/**
 * TrueFalseAnswer Component
 *
 * Single Responsibility: Render True/False question correct answer
 */
function TrueFalseAnswer({ question }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const { isRTL } = useLanguage();
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Icon name="checkCircle" size={18}  />
      <Typography variant="body2" component="span" fontWeight={600} sx={{ mr: 1 }}>
        {t('questions.correctAnswer')}
      </Typography>
      <Icon
        name={isRTL ? 'arrowLeftLines' : 'arrowRightLines'}
        size={21}
        color={theme.palette.primary.main}
      />
      <Chip
        label={getCorrectAnswerLabel(question, t)}
        size="small"
        color="success"
        variant="filled"
      />
    </Stack>
  );
}

TrueFalseAnswer.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.string.isRequired,
    correctAnswer: PropTypes.string.isRequired,
  }).isRequired,
};

export default TrueFalseAnswer;
