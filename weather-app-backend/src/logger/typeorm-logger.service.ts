import { Injectable } from '@nestjs/common';
import { Logger as TypeOrmLogger } from 'typeorm';
import { LoggerService } from './logger.service';

@Injectable()
export class TypeOrmLoggerService implements TypeOrmLogger {
  constructor(private readonly logger: LoggerService) {}

  log(level: 'log' | 'info' | 'warn', message: any) {
    switch (level) {
      case 'info':
      case 'log':
        this.logger.log(message);
        break;
      case 'warn':
        this.logger.warn(message);
        break;
    }
  }

  logMigration(message: string) {
    this.logger.log(message);
  }

  logQuery(query: string, parameters?: any[]) {
    const sql = query + this.formatParameters(parameters);
    this.logger.log(`query ${sql.replace(/\s\s+/g, ' ')}`);
  }

  logQueryError(error: string, query: string, parameters?: any[]) {
    const sql = query + this.formatParameters(parameters);
    this.logger.error(`query failed: ${sql.replace(/\s\s+/g, ' ')}`);
    this.logger.error(error);
  }

  logQuerySlow(time: number, query: string, parameters?: any[]) {
    const sql = query + this.formatParameters(parameters);
    this.logger.log(`query is slow: ${sql.replace(/\s\s+/g, ' ')}`);
    this.logger.log(`execution time: ${time}`);
  }

  logSchemaBuild(message: string) {
    this.logger.log(message);
  }

  private formatParameters(parameters?: any[]): string {
    return parameters && parameters.length ? ` -- PARAMETERS: ${this.stringifyParams(parameters)}` : '';
  }

  private stringifyParams(parameters: any[]) {
    try {
      return JSON.stringify(parameters);
    } catch (error) {
      // most probably circular objects in parameters
      return parameters;
    }
  }
}
