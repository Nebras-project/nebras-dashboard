// external imports

// internal imports
import { TableProfileAvatar } from '@components/table';
import { createPhoneRenderer } from '@utils/rtl';

/**
 * Admin Column Renderers
 *
 * Single Responsibility: Define renderer functions for admin table columns
 * These renderers are used to customize how column values are displayed
 */
const RENDERERS = {
  profileAvatar:
    () =>
    ({ value, row }) =>
      <TableProfileAvatar user={{ ...row, avatar: value, profileImage: value }} size={36} />,
  phone: createPhoneRenderer,
};

export default RENDERERS;
