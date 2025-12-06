import { useState, useRef, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { isMathScienceSubject } from '../constants';

/**
 * useMathSymbolsInput Hook
 *
 * Single Responsibility: Manage math symbols input state and visibility logic
 *
 * @param {Object} params - Hook parameters
 * @param {boolean} params.showSymbolsButton - Whether to show symbols button
 * @param {string|number} params.subjectId - Subject ID (optional, will watch from form if not provided)
 * @param {Array} params.subjectOptions - Array of subject options
 * @returns {Object} Hook return values
 */
export const useMathSymbolsInput = ({ showSymbolsButton, subjectId, subjectOptions = [] }) => {
  const { watch } = useFormContext();
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const buttonRef = useRef(null);

  // Watch subjectId if not provided as prop
  const watchedSubjectId = subjectId || watch('subjectId');

  // Determine if we should show the symbols button
  const shouldShowSymbols = useMemo(() => {
    if (!showSymbolsButton) return false;
    if (!watchedSubjectId) return false;

    // Find the subject name from options
    const subject = subjectOptions.find((opt) => opt.value === watchedSubjectId);
    if (!subject) return false;

    // Check if subject is math/science
    return isMathScienceSubject(subject.label);
  }, [showSymbolsButton, watchedSubjectId, subjectOptions]);

  const openPicker = () => setIsPickerOpen(true);
  const closePicker = () => setIsPickerOpen(false);

  return {
    shouldShowSymbols,
    isPickerOpen,
    buttonRef,
    openPicker,
    closePicker,
  };
};
