import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { Environment } from '../common/enums/environment.enum';
import { formatError } from '../common/errors/utils/format-error.util';
import { LoggerService } from '../logger/logger.service';
import { ConfigSchema, CorsConfig, DatabaseConfig, LoggerConfig, RequestLoggerConfig, ServerConfig, WeatherConfig } from './config.interfaces';
import { config as configSchema } from './config.schema';
import * as config from './environments';

@Injectable()
export class ConfigService {
  private readonly config = configSchema;

  constructor() {
    try {
      const env = this.config.get('env');
      switch (env) {
        case Environment.Local: {
          this.config.load(config.local);
          break;
        }
        case Environment.Test: {
          this.config.load(config.test);
          break;
        }
        case Environment.Development: {
          this.config.load(config.development);
          break;
        }
        case Environment.Production: {
          this.config.load(config.production);
          break;
        }
      }
    } catch (error) {
      const parsedError = formatError(error);
      console.error(parsedError.message, parsedError);
    }
  }

  getCorsConfig(): CorsConfig {
    return {
      origin: this.getValue('cors', 'origin'),
      methods: this.getValue('cors', 'methods'),
      allowedHeaders: this.getValue('cors', 'allowedHeaders'),
    };
  }

  getDatabaseConfig(): DatabaseConfig {
    return {
      database: this.getValue('db', 'database'),
      username: this.getValue('db', 'username'),
      password: this.getValue('db', 'password'),
      logging: this.isDebug(),
      synchronize: this.getValue('db', 'synchronize'),
      host: this.getValue('db', 'host'),
    };
  }

  getEnv(): Environment {
    return this.getValue('env');
  }

  getGracefulShutdownTimeout(): number {
    return this.getValue('gracefulShutdown', 'timeoutMs');
  }

  getLoggerConfig(): LoggerConfig {
    return {
      colorized: this.getValue('logger', 'colorized'),
      enabled: this.getValue('logger', 'enabled'),
      level: this.getValue('logger', 'level'),
    };
  }

  getRequestLoggerConfig(): RequestLoggerConfig {
    return {
      enabled: this.getValue('requestLogger', 'enabled'),
      details: this.getValue('requestLogger', 'details'),
    };
  }

  getWeatherConfig(): WeatherConfig {
    return {
      cacheTtlMs: this.getValue('weather', 'cacheTtlMs'),
      apiUrl: this.getValue('weather', 'apiUrl'),
      forecastDays: this.getValue('weather', 'forecastDays'),
    };
  }

  getServerConfig(): ServerConfig {
    return {
      apiVersion: this.getValue('server', 'apiVersion'),
      apiPrefix: this.getValue('server', 'apiPrefix'),
      port: this.getValue('server', 'port'),
      version: this.getValue('server', 'version'),
    };
  }

  isDebug(): boolean {
    return this.getValue('debug');
  }

  isLocal(): boolean {
    return this.getEnv() === Environment.Local;
  }

  isTest(): boolean {
    return this.getEnv() === Environment.Test;
  }

  validate(logger: LoggerService): void {
    try {
      this.config.validate({ allowed: 'strict' });
      logger.log('Successful config validation');
    } catch (error) {
      logger.error(error.message, error);
    }
  }

  private getValue<P1 extends keyof NonNullable<ConfigSchema>>(prop: P1): NonNullable<ConfigSchema>[P1];
  private getValue<P1 extends keyof NonNullable<ConfigSchema>, P2 extends keyof NonNullable<NonNullable<ConfigSchema>[P1]>>(
    prop1: P1,
    prop2: P2,
  ): NonNullable<NonNullable<ConfigSchema>[P1]>[P2];
  private getValue(...props: string[]): any {
    return props.reduce((result: any, prop) => (result == null ? undefined : result[prop]), this.config.getProperties());
  }
}
