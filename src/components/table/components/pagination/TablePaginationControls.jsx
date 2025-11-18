import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Tooltip from '@mui/material/Tooltip';

import { margin } from '@constants';

function TablePaginationControls({
  count,
  page,
  onPageChange,
  showFirstButton,
  showLastButton,
  variant,
  shape,
  size,
  color,
  siblingCount,
  boundaryCount,
  renderLabel,
}) {
  const renderItem = (itemProps) => {
    const { type, page: itemPage } = itemProps;
    const title = renderLabel(type, itemPage);

    const paginationItem = <PaginationItem sx={{ ...margin.xxs }} {...itemProps} />;

    if (!title) {
      return paginationItem;
    }

    return (
      <Tooltip title={title} arrow>
        <span>{paginationItem}</span>
      </Tooltip>
    );
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
      <Pagination
        count={count}
        page={page}
        onChange={onPageChange}
        showFirstButton={showFirstButton}
        showLastButton={showLastButton}
        variant={variant}
        shape={shape}
        size={size}
        color={color}
        siblingCount={siblingCount}
        boundaryCount={boundaryCount}
        renderItem={renderItem}
      />
    </Box>
  );
}

TablePaginationControls.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  showFirstButton: PropTypes.bool,
  showLastButton: PropTypes.bool,
  variant: PropTypes.oneOf(['text', 'outlined']),
  shape: PropTypes.oneOf(['circular', 'rounded']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf(['primary', 'secondary', 'standard']),
  siblingCount: PropTypes.number,
  boundaryCount: PropTypes.number,
  renderLabel: PropTypes.func.isRequired,
};

export default TablePaginationControls;
