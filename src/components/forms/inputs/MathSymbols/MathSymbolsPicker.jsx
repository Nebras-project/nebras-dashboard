// external imports
import PropTypes from 'prop-types';
import { Popover, Box } from '@mui/material';

// internal imports
import CategoryTabs from './components/CategoryTabs';
import SymbolsGrid from './components/SymbolsGrid';
import { useMathSymbolsPicker } from './hooks/useMathSymbolsPicker';

/**
 * MathSymbolsPicker Component
 *
 * Single Responsibility: Display a popover with mathematical symbols organized by categories
 */
function MathSymbolsPicker({ anchorEl, open, onClose, onSymbolSelect }) {
  const { activeTab, handleTabChange, getCurrentCategory } = useMathSymbolsPicker();

  const handleSymbolClick = (symbol) => {
    onSymbolSelect(symbol);
    onClose();
  };

  const currentCategory = getCurrentCategory();

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      slotProps={{
        paper: {
          sx: { width: 500, height: 300, maxHeight: 500 },
        },
      }}
    >
      <Box>
        <CategoryTabs activeTab={activeTab} onTabChange={handleTabChange} />
        <SymbolsGrid symbols={currentCategory.symbols} onSymbolSelect={handleSymbolClick} />
      </Box>
    </Popover>
  );
}

MathSymbolsPicker.propTypes = {
  anchorEl: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSymbolSelect: PropTypes.func.isRequired,
};

export default MathSymbolsPicker;
