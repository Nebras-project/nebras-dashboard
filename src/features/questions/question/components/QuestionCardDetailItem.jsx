import PropTypes from 'prop-types';
import { Stack, Typography, useTheme } from '@mui/material';
import { Icon } from '@components';
import { useLanguage } from '@hooks';

/**
 * QuestionCardDetailItem Component
 *
 * Single Responsibility: Render a single detail item with icon and text
 *
 * @param {string} iconName - Icon name to display
 * @param {string} label - Label text (optional, used with value prop)
 * @param {string|ReactNode} value - Value text or component (optional, used with label prop)
 * @param {ReactNode} children - Custom content (optional, used when label/value not provided)
 * @param {boolean} show - Whether to show the item
 */
function QuestionCardDetailItem({ iconName, label, value, children, show = true }) {
  const theme = useTheme();
  const { isRTL } = useLanguage();

  if (!show) {
    return null;
  }

  // If label and value are provided, use them
  const hasLabelValue = label !== undefined && value !== undefined;

  return (
    <Stack direction="row" spacing={1} alignItems="center"  >
      <Icon name={iconName} size={18} />
      {hasLabelValue ? (
        <>
          <Typography variant="body2" component="span" fontWeight={600}>
            {label}
          </Typography>

          <Icon name={isRTL ? 'arrowLeftLines' : 'arrowRightLines'} size={21} color={theme.palette.primary.main} />

          <Typography variant="body2" component="span" color="text.primary">
            {value}
          </Typography>
        </>
      ) : (
        <Typography variant="caption" color="text.secondary">
          {children}
        </Typography>
      )}
    </Stack>
  );
}

QuestionCardDetailItem.propTypes = {
  iconName: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]),
  children: PropTypes.node,
  show: PropTypes.bool,
};

export default QuestionCardDetailItem;
