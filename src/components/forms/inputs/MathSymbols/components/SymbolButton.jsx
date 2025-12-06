// external imports
import PropTypes from 'prop-types';
import { Button, Tooltip } from '@mui/material';
import { useTranslation } from '@hooks';
import { padding } from '@constants';
import { fontSizes } from '@theme/typography';

/**
 * SymbolButton Component
 *
 * Single Responsibility: Render a single symbol button with appropriate styling
 */
function SymbolButton({ symbol, onSymbolClick }) {
  const { currentLanguage } = useTranslation();
  const isArabic = currentLanguage === 'ar';

  return (
    <Tooltip title={isArabic ? symbol.labelAr : symbol.label} placement="top">
      <Button
        variant="outlined"
        size="small"
        onClick={() => onSymbolClick(symbol.value)}
        sx={{
          ...padding.all.sm,
          fontSize: fontSizes.lg,
          '&:hover': {
            backgroundColor: 'primary.light',
            color: 'primary.contrastText',
          },
        }}
      >
        {symbol.value}
      </Button>
    </Tooltip>
  );
}

SymbolButton.propTypes = {
  symbol: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    labelAr: PropTypes.string.isRequired,
  }).isRequired,
  onSymbolClick: PropTypes.func.isRequired,
};

export default SymbolButton;
