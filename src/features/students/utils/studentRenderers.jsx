import PropTypes from 'prop-types';
// internal imports
import Chip from '@mui/material/Chip';
import { TableProfileAvatar } from '@components/table';
import { createPhoneRenderer } from '@utils/rtl';
import { getStudentGrade } from './studentFieldUtils';
import { useReduxTheme } from '@hooks';
import EmailConfirmedCell from '../../../components/table/components/EmailConfirmedCell';

function GradeChip({ value, t }) {
  const { isDark } = useReduxTheme();

  return (
    <Chip
      label={t ? t(value) : value}
      size="small"
      color="primary"
      variant={isDark ? 'outlined' : 'filled'}
    />
  );
}

GradeChip.propTypes = {
  value: PropTypes.string,
  t: PropTypes.func,
};
/**
 * Student Column Renderers
 *
 * Single Responsibility: Define renderer functions for student table columns
 */
const RENDERERS = {
  profileAvatar:
    () =>
    ({ value, row }) =>
      <TableProfileAvatar user={{ ...row, avatar: value, profileImage: value }} size={36} />,
  phone: createPhoneRenderer,
  emailConfirmed:
    () =>
    ({ value }) =>
      <EmailConfirmedCell value={value} />,
  grade:
    (t) =>
    ({ value, row }) => {
      const gradeName = getStudentGrade(row) || value || 'N/A';
      return <GradeChip value={gradeName} t={t} />;
    },
};

export default RENDERERS;
