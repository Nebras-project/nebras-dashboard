// external imports
import PropTypes from 'prop-types';
import { Box, Typography, Chip } from '@mui/material';

// internal imports
import { Menu, Icon } from '@components';
import { useTranslation } from '@hooks';
import { toCamelCase } from '@utils';
import { CHOICE_KEYS } from '../../constants';

const buildChoices = (question, t) => {
  if (!question.choices || !Array.isArray(question.choices)) {
    return [];
  }

  return question.choices
    .map((value, index) => {
      const key = CHOICE_KEYS[index];
      return {
        key,
        label: t(`questions.${toCamelCase(key)}`),
        value,
      };
    })
    .filter((choice) => choice.value);
};

const getDropdownLabel = (choices) => {
  if (choices.length === 0) return '-';
  return choices[0].value;
};

/**
 * ChoicesDropdown Component
 *
 * Single Responsibility: Display choices in a dropdown menu within table cell
 */
function ChoicesDropdown({ row }) {
  const { t } = useTranslation();

  const choices = buildChoices(row, t);
  const labelText = getDropdownLabel(choices);
  const isCorrect = (choiceKey) => row.correctAnswer === choiceKey;

  if (choices.length === 0) {
    return <Typography variant="body2">-</Typography>;
  }

  return (
    <Box onClick={(e) => e.stopPropagation()} sx={{ width: '100%' }}>
      <Menu id={`question-choices-menu-${row.id}`} aria-label={t('questions.choices')}>
        <Menu.Trigger>
          <Typography variant="body2" sx={{ cursor: 'pointer' }}>
            {labelText}
          </Typography>
        </Menu.Trigger>

        <Menu.Content
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          minWidth={300}
        >
          {choices.map((choice) => {
            const correct = isCorrect(choice.key);
            return (
              <Menu.Item key={choice.key}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    width: '100%',
                  }}
                >
                  <Chip
                    label={choice.label}
                    size="small"
                    color={correct ? 'success' : 'default'}
                    sx={{ minWidth: 32, display: 'flex', alignItems: 'center' }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ flex: 1, display: 'flex', alignItems: 'center' }}
                  >
                    {choice.value}
                  </Typography>
                  {correct && <Icon name="checkCircle" color="success" size={20} />}
                </Box>
              </Menu.Item>
            );
          })}
        </Menu.Content>
      </Menu>
    </Box>
  );
}

ChoicesDropdown.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    choices: PropTypes.arrayOf(PropTypes.string),
    correctAnswer: PropTypes.string,
  }).isRequired,
};

export default ChoicesDropdown;
