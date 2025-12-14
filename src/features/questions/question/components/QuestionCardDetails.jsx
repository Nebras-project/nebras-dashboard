import PropTypes from 'prop-types';
import { Stack } from '@mui/material';
import { useTranslation } from '@hooks';
import QuestionCardDetailItem from './QuestionCardDetailItem';
import QuestionChoices from './QuestionChoices';
import TrueFalseAnswer from './TrueFalseAnswer';
import { SETTINGS_FIELDS, MINISTERIAL_FIELDS } from '../../constants';

/**
 * QuestionCardDetails Component
 *
 * Single Responsibility: Render question details
 */
function QuestionCardDetails({ question }) {
  const { t } = useTranslation();

  const renderSetting = ({ key, icon, label }) => {
    const value = question[key];
    if (!value && value !== 0) return null;

    return <QuestionCardDetailItem key={key} iconName={icon} label={t(label)} value={value} />;
  };

  const type = question.type;
  const category = question.category;

  return (
    <Stack direction="column" spacing={2}>
      {/* Question Text */}
      <QuestionCardDetailItem
        iconName="questionAnswer"
        label={t('questions.questionText')}
        value={question.question || t('questions.emptyQuestion')}
        show={!!question.question}
      />

      {/* Multiple Choice: Choices - Display in 2 rows, 2 choices per row */}
      {type === 'multipleChoice' && <QuestionChoices question={question} />}

      {/* True/False: Correct Answer */}
      {type === 'trueFalse' && <TrueFalseAnswer question={question} />}

      {/* Question Image */}
      {question.questionImage &&
        renderSetting({
          key: 'questionImage',
          icon: 'visibility',
          label: 'questions.questionImage',
        })}

      {/* Settings Information */}
      {SETTINGS_FIELDS.map((field) => renderSetting(field))}

      {/* Ministerial Fields */}
      {category === 'Ministerial' && MINISTERIAL_FIELDS.map((field) => renderSetting(field))}
    </Stack>
  );
}

QuestionCardDetails.propTypes = {
  question: PropTypes.object.isRequired,
};

export default QuestionCardDetails;
