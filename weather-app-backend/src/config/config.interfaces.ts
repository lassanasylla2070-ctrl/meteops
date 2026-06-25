import { Environment } from '../common/enums/environment.enum';

export interface ConfigSchema {
  cors: {
    allowedHeaders?: string;
    methods: string;
    origin: string;
  };
  db: Omit<DatabaseConfig, 'logging'>;
  debug: boolean;
  env: Environment;
  gracefulShutdown: {
    timeoutMs: number;
  };
  logger: LoggerConfig;
  requestLogger: RequestLoggerConfig;
  server: ServerConfig;
  weather: WeatherConfig;
}

export interface ServerConfig {
  apiPrefix: string;
  apiVersion: number;
  port: number;
  version: string;
}

export interface RequestLoggerConfig {
  details: boolean;
  enabled: boolean;
}

export interface CorsConfig {
  allowedHeaders?: string;
  methods?: string;
  origin?: string;
}

export interface LoggerConfig {
  colorized: boolean;
  enabled: boolean;
  level: string;
}

export interface WeatherConfig {
  cacheTtlMs: number;
  apiUrl: string;
  forecastDays: number;
}

export interface DatabaseConfig {
  database: string;
  username: string;
  password: string;
  logging: boolean;
  synchronize: boolean;
  host: string;
}
