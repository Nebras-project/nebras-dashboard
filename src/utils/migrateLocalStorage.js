/**
 * Migrate old localStorage keys to the new unified system
 * This should be called once when the app loads
 */

const OLD_KEYS = ["colorScheme", "customColor", "theme", "language"];
const NEW_KEY = "nebras_dashboard_state";

export const migrateLocalStorage = () => {
  try {
    // Check if new key already exists
    const existingState = localStorage.getItem(NEW_KEY);

    if (existingState) {
      // New system already in use, just clean up old keys
      OLD_KEYS.forEach((key) => localStorage.removeItem(key));
      return;
    }

    // Migrate old keys to new unified structure
    const migratedState = {};
    let hasOldData = false;

    // Check for old colorScheme data
    const oldScheme = localStorage.getItem("colorScheme");
    const oldCustomColor = localStorage.getItem("customColor");
    if (oldScheme || oldCustomColor) {
      migratedState.colorScheme = {
        scheme: oldScheme || "blue",
        customColor: oldCustomColor || "#0075ff",
      };
      hasOldData = true;
    }

    // If we found old data, save it in new format
    if (hasOldData) {
      localStorage.setItem(NEW_KEY, JSON.stringify(migratedState));

      // Clean up old keys
      OLD_KEYS.forEach((key) => localStorage.removeItem(key));

      console.log("✅ Migrated localStorage to unified key");
    }
  } catch (error) {
    console.error("Error migrating localStorage:", error);
  }
};
