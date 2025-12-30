import PropTypes from 'prop-types';
import Icon from '../../display/Icon';
import { colors } from '../../../theme/colors';


function EmailConfirmedCell({ value = false }) {
  const confirmed = !!value;

  return (
    <>
      {confirmed ? (
        <Icon name="checkWithBorder"  size={20} color={colors.success.light} aria-label="email confirmed" />
      ) : (
        <Icon name="closeWithBorder" size={20} color={colors.error.light} aria-label="email not confirmed" />
      )}
    </>
  );
}

EmailConfirmedCell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number]),
};

// default parameter used instead of defaultProps for function components

export default EmailConfirmedCell;
