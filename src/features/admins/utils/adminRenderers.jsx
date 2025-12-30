// external imports

// internal imports
import { TableProfileAvatar } from '@components/table';
import { createPhoneRenderer } from '@utils/rtl';
import EmailConfirmedCell from '../../../components/table/components/EmailConfirmedCell';

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
  emailConfirmed:
    () =>
    ({ value }) => <EmailConfirmedCell value={value} />,
};

export default RENDERERS;
