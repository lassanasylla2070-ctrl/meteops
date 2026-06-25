import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { Test } from '@nestjs/testing';
import { configureGlobalSettings } from '../../src/common/bootstrap/global-settings';
import { configureGracefulShutdownAndHealthChecks } from '../../src/common/bootstrap/graceful-shutdown';
import { configureMiddlewares } from '../../src/common/bootstrap/middlewares';
import { Environment } from '../../src/common/enums/environment.enum';
import { ConfigService } from '../../src/config/config.service';
import { LoggerService } from '../../src/logger/logger.service';
import { WinstonService } from '../../src/logger/winston.service';
import { TestDatabaseModule } from '../database/test-database.module';
import { ProviderOverrideInterface } from '../test.interfaces';
import { initAppModule } from './init-app-module';

export const createTestAppModule = async (config: ConfigService, overrides?: ProviderOverrideInterface[]): Promise<NestExpressApplication> => {
  const dynamicModules = [];
  if (config.getEnv() === Environment.Test) {
    dynamicModules.push(TestDatabaseModule);
  }

  const appModule = initAppModule(dynamicModules);
  const logger = new LoggerService(new WinstonService(config));
  const server = new ExpressAdapter();
  const moduleFixture = Test.createTestingModule({ imports: [appModule] });
  overrides?.forEach(({ provider, value }) => moduleFixture.overrideProvider(provider).useValue(value));

  const app = (await moduleFixture.compile()).createNestApplication<NestExpressApplication>(server);
  await configureGlobalSettings(app, logger, config);
  configureMiddlewares(app, logger, config);
  await configureGracefulShutdownAndHealthChecks(app, logger, config);

  return app;
};
