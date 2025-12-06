// external imports
import { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormLabel, RadioGroup, FormHelperText, Grid } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

// internal imports
import { useFormFieldError } from '../hooks';
import RadioTextInput from './RadioTextInput';
import { FORM_DEFAULTS } from '../constants';
import { margin } from '@constants';

/**
 * RadioTextInputGroup Component
 *
 * Single Responsibility: Radio group with multiple text input fields integrated with React Hook Form.
 * Each radio option has an associated text input. When a radio is selected, the form field value will be the radioValue.
 * The text input values are stored separately in their own form fields.
 * If a selected radio's text input becomes empty, the selection is cleared.
 */

const RadioTextInputGroup = memo(function RadioTextInputGroup({
  name,
  label,
  choices = [],
  rules,
  defaultValue = FORM_DEFAULTS.RADIO_DEFAULT_VALUE,
  ...radioGroupProps
}) {
  const { control, watch, setValue } = useFormContext();
  const { hasError, helperText } = useFormFieldError(name);
  const formValue = watch(name);

  // Ensure value is always defined (controlled component)
  const radioValue = formValue ?? defaultValue ?? '';

  // Find the selected choice and watch its text input value
  const selectedChoice =
    radioValue && radioValue !== ''
      ? choices.find((choice) => choice.radioValue === radioValue)
      : null;
  const selectedTextInputValue = selectedChoice ? watch(selectedChoice.textInputName) : null;

  // Clear selection if the selected radio's text input becomes empty
  useEffect(() => {
    if (
      radioValue &&
      radioValue !== '' &&
      selectedChoice &&
      (!selectedTextInputValue || selectedTextInputValue.trim() === '')
    ) {
      setValue(name, defaultValue ?? '', { shouldValidate: true });
    }
  }, [radioValue, selectedTextInputValue, selectedChoice, name, setValue, defaultValue]);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormControl error={hasError} component="fieldset" fullWidth>
          {label && <FormLabel component="legend">{label}</FormLabel>}
          <RadioGroup {...field} value={radioValue} sx={{ ...margin.top.lg }} {...radioGroupProps}>
            <Grid container spacing={2}>
              {choices.map((choice, index) => {
                const {
                  radioValue,
                  label: choiceLabel,
                  textInputName,
                  textInputLabel,
                  textInputRules,
                  textInputDefaultValue,
                  textInputProps = {},
                  ...radioProps
                } = choice;

                return (
                  <Grid size={{ mobile: 12, tablet: 6, desktop: 6 }} key={radioValue || index}>
                    <RadioTextInput
                      radioValue={radioValue}
                      label={choiceLabel}
                      textInputName={textInputName}
                      textInputLabel={textInputLabel}
                      textInputRules={textInputRules}
                      textInputDefaultValue={textInputDefaultValue}
                      textInputProps={textInputProps}
                      {...radioProps}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </RadioGroup>
          {hasError && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      )}
    />
  );
});

RadioTextInputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      radioValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string,
      textInputName: PropTypes.string.isRequired,
      textInputLabel: PropTypes.string,
      textInputRules: PropTypes.object,
      textInputDefaultValue: PropTypes.string,
      textInputProps: PropTypes.object,
    })
  ).isRequired,
  rules: PropTypes.object,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

RadioTextInputGroup.displayName = 'RadioTextInputGroup';

export default RadioTextInputGroup;
