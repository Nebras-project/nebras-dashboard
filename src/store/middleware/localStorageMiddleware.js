const STORAGE_KEY = 'nebras_dashboard_state';

// Define which slices should be persisted, what to save
const PERSISTED_SLICES = ['theme', 'language', 'sidebar', 'auth', 'colorScheme'];

// Define fields to exclude from persistence (sensitive data),  What NOT to save (security!)
const EXCLUDED_FIELDS = {
  auth: ['token', 'refreshToken'], // 🔒 Keep tokens out of localStorage
  sidebar: ['isOpen'], // Don't persist drawer state - determined by screen size
};

export const loadPersistedState = () => {
  try {
    // 1. Read from localStorage
    const serializedState = localStorage.getItem(STORAGE_KEY);

    // 2. If nothing saved, return undefined
    if (serializedState === null) {
      return undefined;
    }

    // 3. Parse JSON and return
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading persisted state:', error);
    return undefined;
  }
};

const filterSensitiveData = (sliceName, sliceData) => {
  const excludedFields = EXCLUDED_FIELDS[sliceName];

  // If no sensitive fields for this slice, return as-is
  if (!excludedFields || !sliceData) {
    return sliceData;
  }

  // Make a copy (don't modify original)
  const filtered = { ...sliceData };

  // Remove sensitive fields
  excludedFields.forEach((field) => {
    delete filtered[field]; // Remove 'token', 'refreshToken'
  });

  return filtered;
};

const saveToLocalStorage = (state) => {
  try {
    // Only save the slices we want to persist
    const stateToPersist = {};

    // For each slice we want to save
    PERSISTED_SLICES.forEach((slice) => {
      if (state[slice]) {
        // Filter sensitive data before persisting
        stateToPersist[slice] = filterSensitiveData(slice, state[slice]);
      }
    });

    const serializedState = JSON.stringify(stateToPersist);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (error) {
    console.error('Error saving state to localStorage:', error);
  }
};

export const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // Save state after each action
  const state = store.getState();
  saveToLocalStorage(state);

  return result;
};

export const clearPersistedState = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing persisted state:', error);
  }
};
