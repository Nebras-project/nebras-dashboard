// In-memory storage for tokens (most secure client-side option)
// Trade-off: Tokens are lost on page refresh (user needs to re-login)
let tokenStore = {
  accessToken: null,
  refreshToken: null,
};

export const setSecureToken = (accessToken, refreshToken = null) => {
  tokenStore.accessToken = accessToken;
  tokenStore.refreshToken = refreshToken;
};

export const getSecureToken = () => {
  return tokenStore.accessToken;
};

export const getRefreshToken = () => {
  return tokenStore.refreshToken;
};

export const clearSecureTokens = () => {
  tokenStore.accessToken = null;
  tokenStore.refreshToken = null;
};

export const hasValidToken = () => {
  return tokenStore.accessToken !== null;
};

// ============================================
// ALTERNATIVE: sessionStorage (persists during tab session)
// Uncomment below if you want tokens to persist during tab session
// ============================================

/*
const SESSION_TOKEN_KEY = 'nebras_access_token';
const SESSION_REFRESH_KEY = 'nebras_refresh_token';

export const setSecureToken = (accessToken, refreshToken = null) => {
  sessionStorage.setItem(SESSION_TOKEN_KEY, accessToken);
  if (refreshToken) {
    sessionStorage.setItem(SESSION_REFRESH_KEY, refreshToken);
  }
};

export const getSecureToken = () => {
  return sessionStorage.getItem(SESSION_TOKEN_KEY);
};

export const getRefreshToken = () => {
  return sessionStorage.getItem(SESSION_REFRESH_KEY);
};

export const clearSecureTokens = () => {
  sessionStorage.removeItem(SESSION_TOKEN_KEY);
  sessionStorage.removeItem(SESSION_REFRESH_KEY);
};

export const hasValidToken = () => {
  return sessionStorage.getItem(SESSION_TOKEN_KEY) !== null;
};
*/
