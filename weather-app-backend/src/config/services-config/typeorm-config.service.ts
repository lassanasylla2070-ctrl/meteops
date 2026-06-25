import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { TypeOrmLoggerService } from '../../logger/typeorm-logger.service';
import { ConfigService } from '../config.service';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService, private readonly typeOrmLogger?: TypeOrmLoggerService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const isLocal = this.configService.isLocal();
    const isTest = this.configService.isTest();
    const shouldUseSqlite = isLocal || isTest;
    const prettyLoggerEnabled = this.configService.isDebug() && isLocal;
    const { database, logging, ...restDatabaseConfig } = this.configService.getDatabaseConfig();

    const sqliteConfig: SqliteConnectionOptions = {
      type: 'sqlite',
      database,
    };

    const postgresConfig: PostgresConnectionOptions = {
      type: 'postgres',
      database,
      ...restDatabaseConfig,
    };

    return {
      ...(shouldUseSqlite ? sqliteConfig : postgresConfig),
      logging,
      migrationsRun: false,
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      cli: { migrationsDir: 'src/migration' },
      namingStrategy: new SnakeNamingStrategy(),
      logger: prettyLoggerEnabled ? undefined : this.typeOrmLogger, // pretty logger is default
    };
  }
}
