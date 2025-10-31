/**
 * Migrate old localStorage keys to the new unified system
 * This should be called once when the app loads
 */

const OLD_KEYS = ['colorScheme', 'customColor', 'theme', 'language'];
const NEW_KEY = 'nebras_dashboard_state';

export const migrateLocalStorage = () => {
  try {
    // Check if new key already exists
    const existingState = localStorage.getItem(NEW_KEY);

    if (existingState) {
      // New system already in use, clean up old keys and fix sidebar state
      OLD_KEYS.forEach((key) => localStorage.removeItem(key));

      // Always clean up sidebar state - remove isOpen and isMobile (should not be persisted)
      try {
        const state = JSON.parse(existingState);
        let modified = false;

        if (state.sidebar) {
          if (state.sidebar.isOpen !== undefined) {
            delete state.sidebar.isOpen;
            modified = true;
          }
          if (state.sidebar.isMobile !== undefined) {
            delete state.sidebar.isMobile;
            modified = true;
          }

          if (modified) {
            localStorage.setItem(NEW_KEY, JSON.stringify(state));
            console.log('✅ Cleaned sidebar drawer state from localStorage');
          }
        }
      } catch (e) {
        console.error('Error cleaning sidebar state:', e);
      }

      return;
    }

    // Migrate old keys to new unified structure
    const migratedState = {};
    let hasOldData = false;

    // Check for old colorScheme data
    const oldScheme = localStorage.getItem('colorScheme');
    const oldCustomColor = localStorage.getItem('customColor');
    if (oldScheme || oldCustomColor) {
      migratedState.colorScheme = {
        scheme: oldScheme || 'default',
        customColor: oldCustomColor || '#17cd96',
      };
      hasOldData = true;
    }

    // If we found old data, save it in new format
    if (hasOldData) {
      localStorage.setItem(NEW_KEY, JSON.stringify(migratedState));

      // Clean up old keys
      OLD_KEYS.forEach((key) => localStorage.removeItem(key));

      console.log('✅ Migrated localStorage to unified key');
    }
  } catch (error) {
    console.error('Error migrating localStorage:', error);
  }
};
