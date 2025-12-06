// external imports
import PropTypes from 'prop-types';
import { InputAdornment, IconButton, Tooltip } from '@mui/material';
import { useTranslation } from '@hooks';

// internal imports
import { Icon } from '@components';

/**
 * MathSymbolButton Component
 *
 * Single Responsibility: Render button with tooltip for opening math symbols picker
 */
function MathSymbolButton({ buttonRef, onClick, ...iconButtonProps }) {
  const { t } = useTranslation();

  return (
    <InputAdornment position="end">
      <Tooltip
        title={t('questions.insertMathSymbol') || 'Insert Math Symbol'}
        arrow
        placement="top"
      >
        <IconButton
          ref={buttonRef}
          onClick={onClick}
          edge="end"
          size="small"
          aria-label={t('questions.insertMathSymbol') || 'Insert math symbol'}
          {...iconButtonProps}
        >
          <Icon name="alphabetGreek" size={30} />
        </IconButton>
      </Tooltip>
    </InputAdornment>
  );
}

MathSymbolButton.propTypes = {
  buttonRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  onClick: PropTypes.func.isRequired,
};

MathSymbolButton.displayName = 'MathSymbolButton';

export default MathSymbolButton;
