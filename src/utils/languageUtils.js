export const getInitialLanguage = () => {
  try {
    const state = localStorage.getItem('nebras_dashboard_state');
    if (state) {
      const parsed = JSON.parse(state);
      return parsed?.language?.currentLanguage || 'ar';
    }
    return 'ar';
  } catch (error) {
    console.error('Error loading initial language:', error);
    return 'ar';
  }
};

export const getBrowserLanguage = () => {
  const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
  return browserLang.startsWith('ar') ? 'ar' : 'en';
};

export const resolveLanguage = (storedLanguage) => {
  return storedLanguage === 'system' ? getBrowserLanguage() : storedLanguage;
};
