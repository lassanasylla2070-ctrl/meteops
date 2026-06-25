export const CONFIG_DEFAULTS = {
  API_VERSION: 1,
  CORS_ORIGIN: '*',
  CORS_METHODS: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  DEBUG: false,
  GRACEFUL_SHUTDOWN_TIMEOUT_MS: 30 * 1000, // 30 seconds
  LOGGER: {
    COLORIZED: false,
    ENABLED: true,
    LEVEL: 'warning',
  },
  PORT: 3000,
  REQUEST_LOGGER: {
    DETAILS: false,
    ENABLED: true,
  },
  WEATHER_CACHE_TTL_MS: 5 * 60 * 1000, // 5 minutes
  WEATHER_FORECAST_DAYS: 5,
};
