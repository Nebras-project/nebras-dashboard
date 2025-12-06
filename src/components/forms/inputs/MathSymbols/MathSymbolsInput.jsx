// external imports
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

// internal imports
import { useFormFieldError } from '../../hooks';
import { FORM_DEFAULTS } from '../../constants';
import MathSymbolsPicker from './MathSymbolsPicker';
import { useMathSymbolsInput } from './hooks/useMathSymbolsInput';
import { insertSymbolAtCursor, getCursorPosition, setCursorPosition } from './utils/insertSymbol';
import { MathSymbolButton } from './components';

/**
 * MathSymbolsInput Component
 *
 * Single Responsibility: Render text input field with math symbols picker button
 */
function MathSymbolsInput({
  name,
  label,
  rules,
  defaultValue = FORM_DEFAULTS.TEXT_INPUT_DEFAULT_VALUE,
  showSymbolsButton = true,
  subjectId,
  subjectOptions = [],
  ...textFieldProps
}) {
  const { control } = useFormContext();
  const { hasError, helperText } = useFormFieldError(name);

  const { shouldShowSymbols, isPickerOpen, buttonRef, openPicker, closePicker } =
    useMathSymbolsInput({
      showSymbolsButton,
      subjectId,
      subjectOptions,
    });

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field }) => {
        const handleSymbolSelect = (symbol) => {
          const cursorPosition = getCursorPosition(name, field.value?.length || 0);
          const newValue = insertSymbolAtCursor(field.value || '', cursorPosition, symbol);
          field.onChange(newValue);

          // Set cursor position after inserting symbol
          const newPosition = cursorPosition + symbol.length;
          setCursorPosition(name, newPosition);
        };

        return (
          <>
            <TextField
              {...field}
              {...textFieldProps}
              name={name}
              label={label}
              error={hasError}
              helperText={helperText}
              fullWidth={textFieldProps.fullWidth !== false}
              margin={textFieldProps.margin || 'normal'}
              slotProps={{
                input: {
                  endAdornment: shouldShowSymbols ? (
                    <MathSymbolButton buttonRef={buttonRef} onClick={openPicker} />
                  ) : undefined,
                  ...textFieldProps.slotProps?.input,
                },
                ...textFieldProps.slotProps,
              }}
            />

            {shouldShowSymbols && (
              <MathSymbolsPicker
                anchorEl={buttonRef.current}
                open={isPickerOpen}
                onClose={closePicker}
                onSymbolSelect={handleSymbolSelect}
              />
            )}
          </>
        );
      }}
    />
  );
}

MathSymbolsInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  rules: PropTypes.object,
  defaultValue: PropTypes.string,
  showSymbolsButton: PropTypes.bool,
  subjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  subjectOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};

MathSymbolsInput.displayName = 'MathSymbolsInput';

export default MathSymbolsInput;
