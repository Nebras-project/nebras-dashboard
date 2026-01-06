/**
 * Ministerial Forms Utilities
 * Export all ministerial form-related utility functions
 */

/**
 * Get display name for a ministerial form
 * @param {Object} form - Form object
 * @returns {string} Form display name
 */
export const getFormName = (form) => {
  if (!form) return 'N/A';

  console.log(form);
  const { formNumber, year } = form;

  if (formNumber && year) {
    return `نموذج ${formNumber} - ${year}`;
  }

  if (formNumber) {
    return `نموذج ${formNumber}`;
  }

  return 'N/A';
};

export const getYearOptions = (forms) => {
  if (!forms || !Array.isArray(forms)) {
    return [];
  }
  const yearOptions = [...new Set(forms.map((form) => form.year))].map((year) => ({
    label: year,
    value: year,
  }));

  return yearOptions;
};
