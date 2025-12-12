// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, Radio, Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';

// internal imports
import TextInput from './TextInput';
import MathSymbolsInput from './MathSymbols/MathSymbolsInput';
import { FORM_DEFAULTS } from '../constants';

/**
 * RadioTextInput Component
 *
 * Single Responsibility: Radio button with text input field integrated with React Hook Form.
 * When the radio is checked, the form field value will be the radioValue (not the text input's value).
 * The text input value is stored separately in its own form field.
 * The radio is disabled if the text input is empty.
 * Supports math symbols input when showSymbolsButton is true.
 */

const RadioTextInput = memo(function RadioTextInput({
  radioValue,
  label,
  textInputName,
  textInputLabel,
  textInputRules,
  textInputDefaultValue = FORM_DEFAULTS.TEXT_INPUT_DEFAULT_VALUE,
  textInputProps = {},
  showSymbolsButton = false,
  subjectId,
  subjectOptions = [],
  ...radioProps
}) {
  const { watch } = useFormContext();
  const textInputValue = watch(textInputName);

  // Disable radio if text input is empty
  const isDisabled = !textInputValue || textInputValue.trim() === '';

  // Choose input component based on showSymbolsButton
  const InputComponent = showSymbolsButton ? MathSymbolsInput : TextInput;

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <FormControlLabel
        control={<Radio {...radioProps} value={radioValue} disabled={isDisabled} />}
        label={label}
        sx={{ minWidth: '50px' }}
      />
      <InputComponent
        name={textInputName}
        label={textInputLabel}
        rules={textInputRules}
        defaultValue={textInputDefaultValue}
        showSymbolsButton={showSymbolsButton}
        subjectId={subjectId}
        subjectOptions={subjectOptions}
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
  showSymbolsButton: PropTypes.bool,
  subjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  subjectOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};

RadioTextInput.displayName = 'RadioTextInput';

export default RadioTextInput;
