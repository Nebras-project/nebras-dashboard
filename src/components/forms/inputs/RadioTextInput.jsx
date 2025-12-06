// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, Radio, Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';

// internal imports
import TextInput from './TextInput';
import { FORM_DEFAULTS } from '../constants';

/**
 * RadioTextInput Component
 *
 * Single Responsibility: Radio button with text input field integrated with React Hook Form.
 * When the radio is checked, the form field value will be the radioValue (not the text input's value).
 * The text input value is stored separately in its own form field.
 * The radio is disabled if the text input is empty.
 */

const RadioTextInput = memo(function RadioTextInput({
  radioValue,
  label,
  textInputName,
  textInputLabel,
  textInputRules,
  textInputDefaultValue = FORM_DEFAULTS.TEXT_INPUT_DEFAULT_VALUE,
  textInputProps = {},
  ...radioProps
}) {
  const { watch } = useFormContext();
  const textInputValue = watch(textInputName);

  // Disable radio if text input is empty
  const isDisabled = !textInputValue || textInputValue.trim() === '';

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <FormControlLabel
        control={<Radio {...radioProps} value={radioValue} disabled={isDisabled} />}
        label={label}
        sx={{ minWidth: '50px' }}
      />
      <TextInput
        name={textInputName}
        label={textInputLabel}
        rules={textInputRules}
        defaultValue={textInputDefaultValue}
        {...textInputProps}
      />
    </Stack>
  );
});

RadioTextInput.propTypes = {
  radioValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string,
  textInputName: PropTypes.string.isRequired,
  textInputLabel: PropTypes.string,
  textInputRules: PropTypes.object,
  textInputDefaultValue: PropTypes.string,
  textInputProps: PropTypes.object,
};

RadioTextInput.displayName = 'RadioTextInput';

export default RadioTextInput;
