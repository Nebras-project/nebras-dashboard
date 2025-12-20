// external imports
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';

// internal imports
import { TableProfileAvatar } from '@components/table';
import { createPhoneRenderer } from '@utils/rtl';
import { getRoleLabel } from '@utils/roleUtils';
import { useReduxTheme } from '@hooks';

/**
 * RoleChip Component
 *
 * Renders a chip for manager roles with variant based on theme mode
 */
function RoleChip({ value, t }) {
  const { isDark } = useReduxTheme();

  return (
    <Chip
      label={t ? getRoleLabel(value, t) : value}
      size="small"
      color={
        ['Curriculum Manager', 'Competition Manager', 'Content Manager'].includes(value)
          ? 'primary'
          : 'default'
      }
      variant={isDark ? 'outlined' : 'filled'}
    />
  );
}

RoleChip.propTypes = {
  value: PropTypes.string,
  t: PropTypes.func,
};

/**
 * Manager Column Renderers
 *
 * Single Responsibility: Define renderer functions for manager table columns
 * These renderers are used to customize how column values are displayed
 */
const RENDERERS = {
  profileAvatar:
    () =>
    ({ value, row }) =>
      <TableProfileAvatar user={{ ...row, avatar: value, profileImage: value }} size={36} />,
  phone: createPhoneRenderer,
  roleChip:
    (t) =>
    ({ value }) =>
      <RoleChip value={value} t={t} />,
};

export default RENDERERS;
