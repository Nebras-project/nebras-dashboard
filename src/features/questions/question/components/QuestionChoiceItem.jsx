import PropTypes from 'prop-types';
import { Stack, Typography, Box } from '@mui/material';
import { useTranslation, useReduxTheme } from '@hooks';
import Icon from '@components/display/Icon';
import { borderRadius } from '@theme';
import { borderColors } from '@theme/colors';
import { padding } from '@constants';

/**
 * QuestionChoiceItem Component
 *
 * Single Responsibility: Render a single choice item with label, value, and correct answer indicator
 */
function QuestionChoiceItem({ choiceKey, choiceValue, isCorrect }) {
  const { t } = useTranslation();
  const { mode } = useReduxTheme();
  const choiceLabel = t(`questions.${choiceKey}`);

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography variant="body2" component="span" fontWeight={600}>
        {choiceLabel}
      </Typography>
      <Box
        sx={{
          borderRadius: borderRadius.xxs,
          border: isCorrect ? '2px solid' : '1px solid',
          borderColor: isCorrect ? 'success.main' : borderColors[mode],
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          ...padding.all.md,
        }}
      >
        <Typography
          variant="body2"
          component="span"
          fontWeight={isCorrect ? 600 : 400}
          sx={{ flex: 1 }}
        >
          {choiceValue || '-'}
        </Typography>
        {isCorrect && <Icon name="checkCircle" color="success" size={20} />}
      </Box>
    </Stack>
  );
}

QuestionChoiceItem.propTypes = {
  choiceKey: PropTypes.string.isRequired,
  choiceValue: PropTypes.string,
  isCorrect: PropTypes.bool.isRequired,
};

export default QuestionChoiceItem;
