import convict, { Schema, SchemaObj } from 'convict';
import { Environment } from '../common/enums/environment.enum';
import { CONFIG_DEFAULTS } from './config.constants';
import { ConfigSchema, ServerConfig } from './config.interfaces';

const {
  API_VERSION,
  CORS_METHODS,
  CORS_ORIGIN,
  DEBUG,
  GRACEFUL_SHUTDOWN_TIMEOUT_MS,
  LOGGER,
  PORT,
  REQUEST_LOGGER,
  WEATHER_CACHE_TTL_MS,
  WEATHER_FORECAST_DAYS,
} = CONFIG_DEFAULTS;

const configSchema: Schema<ConfigSchema> = {
  cors: {
    origin: {
      doc: 'Configures the Access-Control-Allow-Origin CORS header',
      format: String,
      default: CORS_ORIGIN,
      env: 'CORS_ORIGIN',
    },
    methods: {
      doc: 'Configures the Access-Control-Allow-Methods CORS header; methods separated by comma',
      format: String,
      default: CORS_METHODS,
      env: 'CORS_METHODS',
    },
    allowedHeaders: {
      doc: 'Configures the Access-Control-Allow-Headers CORS header',
      format: function check(val: any) {
        if (!!val && typeof val !== 'string') {
          throw new Error("must be a comma-delimited string (ex: 'Content-Type,Authorization')");
        }
      },
      default: null,
      env: 'CORS_HEADERS',
    },
  },
  db: {
    database: {
      doc: 'Database name',
      format: String,
      default: null,
      env: 'DATABASE_NAME',
    },
    password: {
      doc: 'Database password',
      format: String,
      default: null,
      env: 'DATABASE_PASSWORD',
    },
    username: {
      doc: 'Database username',
      format: String,
      default: null,
      env: 'DATABASE_USERNAME',
    },
    synchronize: {
      doc: 'Database synchronization',
      format: Boolean,
      default: null,
      env: 'DATABASE_SYNC',
    },
    host: {
      doc: 'Database host',
      format: String,
      default: null,
      env: 'DATABASE_HOST',
    },
  },
  debug: {
    doc: 'Runs application in debug mode (additional logs)',
    format: Boolean,
    default: DEBUG,
    env: 'DEBUG',
  },
  env: {
    doc: 'The application environment.',
    format: [Environment.Production, Environment.Development, Environment.Stage, Environment.Test, Environment.Local],
    default: null,
    env: 'ENV',
  },
  gracefulShutdown: {
    timeoutMs: {
      doc: 'Graceful shutdown timeout in millis',
      format: Number,
      default: GRACEFUL_SHUTDOWN_TIMEOUT_MS,
      env: 'GRACEFUL_SHUTDOWN_TIMEOUT',
    },
  },
  logger: {
    colorized: {
      doc: 'Colorized logs',
      format: Boolean,
      default: LOGGER.COLORIZED,
      env: 'LOGGER_COLORIZED',
    },
    level: {
      format: String,
      default: LOGGER.LEVEL,
      env: 'LOGGER_LEVEL',
    },
    enabled: {
      format: Boolean,
      default: LOGGER.ENABLED,
      env: 'LOGGER_ENABLED',
    },
  },
  requestLogger: {
    enabled: {
      format: Boolean,
      default: REQUEST_LOGGER.ENABLED,
      env: 'REQUEST_LOGGER_ENABLED',
    },
    details: {
      doc: 'Show request logger details',
      format: Boolean,
      default: REQUEST_LOGGER.DETAILS,
      env: 'REQUEST_LOGGER_DETAILS',
    },
  },
  server: {
    get apiPrefix() {
      return {
        doc: 'API global prefix',
        format: String,
        default: '/api/v' + (process.env.API_VERSION || ((this as Schema<ServerConfig>).apiVersion as SchemaObj).default),
        env: 'API_PREFIX',
      };
    },
    apiVersion: {
      doc: 'API version number',
      format: Number,
      default: API_VERSION,
      env: 'API_VERSION',
    },
    port: {
      format: 'port',
      default: PORT,
      env: 'PORT',
    },
    version: {
      doc: 'App version',
      format: String,
      default: null,
      env: 'npm_package_version',
    },
  },
  weather: {
    cacheTtlMs: {
      doc: 'Weather cache TTL in minutes',
      format: Number,
      default: WEATHER_CACHE_TTL_MS,
      env: 'WEATHER_CACHE_TTL_MS',
    },
    apiUrl: {
      doc: 'Weather API url',
      format: String,
      default: null,
      env: 'WEATHER_API_URL',
    },
    forecastDays: {
      doc: 'Weather forecast days',
      format: Number,
      default: WEATHER_FORECAST_DAYS,
      env: 'WEATHER_FORECAST_DAYS',
    },
  },
};

export const config = convict(configSchema);
