/**
 * Insert Symbol Utility
 *
 * Single Responsibility: Handle symbol insertion at cursor position in text input
 */

/**
 * Insert a symbol at the cursor position in a text value
 *
 * @param {string} currentValue - Current text value
 * @param {number} cursorPosition - Current cursor position
 * @param {string} symbol - Symbol to insert
 * @returns {string} New text value with symbol inserted
 */
export const insertSymbolAtCursor = (currentValue, cursorPosition, symbol) => {
  const before = currentValue.substring(0, cursorPosition);
  const after = currentValue.substring(cursorPosition);
  return before + symbol + after;
};

/**
 * Get cursor position from input element
 *
 * @param {string} name - Input field name
 * @param {number} fallbackLength - Fallback length if input not found
 * @returns {number} Cursor position
 */
export const getCursorPosition = (name, fallbackLength = 0) => {
  const input = document.querySelector(`input[name="${name}"], textarea[name="${name}"]`);
  return input?.selectionStart ?? fallbackLength;
};

/**
 * Set cursor position in input element
 *
 * @param {string} name - Input field name
 * @param {number} position - Cursor position to set
 */
export const setCursorPosition = (name, position) => {
  setTimeout(() => {
    const input = document.querySelector(`input[name="${name}"], textarea[name="${name}"]`);
    if (input) {
      input.setSelectionRange(position, position);
      input.focus();
    }
  }, 0);
};
