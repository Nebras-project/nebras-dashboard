// external imports
import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import SymbolButton from './SymbolButton';
import { padding } from '@constants';

/**
 * SymbolsGrid Component
 *
 * Single Responsibility: Display a grid of symbol buttons for a specific category
 */
function SymbolsGrid({ symbols, onSymbolSelect }) {
  return (
    <Box
      sx={{
        ...padding.all.md,
      }}
    >
      <Grid container spacing={1} justifyContent="center">
        {symbols.map((symbol, index) => (
          <Grid key={index}>
            <SymbolButton symbol={symbol} onSymbolClick={onSymbolSelect} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

SymbolsGrid.propTypes = {
  symbols: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      labelAr: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSymbolSelect: PropTypes.func.isRequired,
};

export default SymbolsGrid;
