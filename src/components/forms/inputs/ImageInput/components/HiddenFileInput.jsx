/**
 * HiddenFileInput Component
 *
 * Single Responsibility: Hidden file input element
 */

import { memo } from 'react';
import PropTypes from 'prop-types';

const HiddenFileInput = memo(function HiddenFileInput({ fileInputRef, accept, onChange }) {
  return (
    <input
      ref={fileInputRef}
      type="file"
      accept={accept}
      style={{ display: 'none' }}
      onChange={onChange}
    />
  );
});

HiddenFileInput.propTypes = {
  fileInputRef: PropTypes.object.isRequired,
  accept: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

HiddenFileInput.displayName = 'HiddenFileInput';

export default HiddenFileInput;
