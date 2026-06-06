export const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_BASE_URL;
  // If the envUrl is configured and is NOT the default localhost port, use it
  if (envUrl && !envUrl.includes('localhost:4000')) {
    return envUrl;
  }
  // Fallback for local development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:4000';
  }
  // For production deployment where frontend and backend are hosted together
  return '';
};
