// external imports
import PropTypes from 'prop-types';

// internal imports
import { IconButtonWithTooltip } from '@components';
import { useTranslation } from '@hooks';

/**
 * ExportButton Component
 *
 * A button that triggers DataGrid CSV export functionality.
 * Requires a tableRef that exposes exportDataAsCsv method.
 */
function ExportButton({ tableRef, disabled = false, filename = 'export', ...props }) {
  const { t } = useTranslation();

  const handleExport = () => {
    if (tableRef?.current) {
      tableRef.current.exportDataAsCsv({
        fileName: filename,
        utf8WithBom: true, // Add BOM for proper UTF-8 encoding (important for Arabic/Excel)
      });
    }
  };

  return (
    <IconButtonWithTooltip
      iconName="export"
      tooltip={t('table.toolbar.exportCSV')}
      onClick={handleExport}
      disabled={disabled || !tableRef?.current}
      text={t('table.toolbar.export')}
      {...props}
    />
  );
}

ExportButton.propTypes = {
  tableRef: PropTypes.object,
  disabled: PropTypes.bool,
  filename: PropTypes.string,
};

export default ExportButton;
