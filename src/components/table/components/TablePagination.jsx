// external imports
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';

import { padding } from '@constants';
import useTranslation from '@i18n/hooks/useTranslation';
import usePagination from '../hooks/usePagination';
import { useResponsive } from '@hooks';
import TablePaginationControls from './pagination/TablePaginationControls';
import TablePageSizeSelector from './pagination/TablePageSizeSelector';

function TablePagination({
  showFirstButton = true,
  showLastButton = true,
  variant = 'text',
  shape = 'rounded',
  size = 'small',
  color = 'primary',
  siblingCount = 1,
  boundaryCount = 1,
  className,
  pageSizeOptions: pageSizeOptionsProp,
}) {
  const { t } = useTranslation();

  const { isSmallScreen } = useResponsive();
  const { page, pageCount, pageSizeOptions, showPageSizeSelect, formMethods, handlePageChange } =
    usePagination({ pageSizeOptions: pageSizeOptionsProp });

  const renderLabel = (type, itemPage) => {
    switch (type) {
      case 'first':
        return t('table.pagination.first');
      case 'last':
        return t('table.pagination.last');
      case 'next':
        return t('table.pagination.next');
      case 'previous':
        return t('table.pagination.previous');
      default:
        return `${t('table.pagination.page')} ${itemPage}`;
    }
  };

  return (
    <Stack
      direction={isSmallScreen ? 'column' : 'row'}
      justifyContent={isSmallScreen ? 'center' : 'space-between'}
      alignItems="center"
      spacing={isSmallScreen ? 2.5 : 2}
      sx={{ ...padding.y.sm, width: '100%' }}
      className={className}
    >
      <TablePaginationControls
        count={pageCount}
        variant={isSmallScreen ? 'outlined' : variant}
        page={page + 1}
        onPageChange={handlePageChange}
        showFirstButton={showFirstButton}
        showLastButton={showLastButton}
        shape={shape}
        size={size}
        color={color}
        siblingCount={siblingCount}
        boundaryCount={boundaryCount}
        renderLabel={renderLabel}
      />

      <TablePageSizeSelector
        formMethods={formMethods}
        label={t('table.pagination.rowsPerPage')}
        options={pageSizeOptions}
        show={showPageSizeSelect && !isSmallScreen}
        align="right"
      />
    </Stack>
  );
}

TablePagination.propTypes = {
  showFirstButton: PropTypes.bool,
  showLastButton: PropTypes.bool,
  variant: PropTypes.oneOf(['text', 'outlined']),
  shape: PropTypes.oneOf(['circular', 'rounded']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf(['primary', 'secondary', 'standard']),
  siblingCount: PropTypes.number,
  boundaryCount: PropTypes.number,
  className: PropTypes.string,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
};

export default TablePagination;
