// external imports
import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dialog, DialogContent } from '@mui/material';
import dayjs from 'dayjs';

// internal imports
import { useLanguage, useTranslation } from '@hooks';
import 'dayjs/locale/ar';
import 'dayjs/locale/en';

/**
 * TimePickerDialog Component
 *
 * Single Responsibility: Render a dialog containing StaticTimePicker for time selection
 * StaticTimePicker has built-in OK and Cancel buttons via onAccept and onCancel
 */
function TimePickerDialog({ open, onClose, value, onChange }) {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation();
  const [selectedTime, setSelectedTime] = useState(null);

  // Update selectedTime when value or open changes
  useEffect(() => {
    if (open) {
      setSelectedTime(value ? dayjs(value, 'HH:mm') : null);
    }
  }, [value, open]);

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleAccept = () => {
    onChange(selectedTime ? selectedTime.format('HH:mm') : '');
    onClose();
  };

  const handleCancel = () => {
    setSelectedTime(value ? dayjs(value, 'HH:mm') : null);
    onClose();
  };

  // Localization text for TimePicker
  const localeText = useMemo(
    () => ({
      okButtonLabel: t('common.confirm'),
      cancelButtonLabel: t('common.cancel'),
      toolbarTitle: t('common.selectTime'),
    }),
    [t]
  );

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={currentLanguage}
      localeText={localeText}
    >
      <Dialog open={open} onClose={handleCancel}>
        <DialogContent>
          <StaticTimePicker
            value={selectedTime}
            onChange={handleTimeChange}
            onAccept={handleAccept}
            onCancel={handleCancel}
            ampm={true}
            localeText={localeText}
          />
        </DialogContent>
      </Dialog>
    </LocalizationProvider>
  );
}

TimePickerDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default TimePickerDialog;
