import 'source-map-support/register';
import { AppModule } from './app.module';
import { configureGlobalSettings } from './common/bootstrap/global-settings';
import { configureGracefulShutdownAndHealthChecks } from './common/bootstrap/graceful-shutdown';
import { configureMiddlewares } from './common/bootstrap/middlewares';
import { configureSwagger } from './common/bootstrap/swagger';
import { ConfigService } from './config/config.service';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { LoggerService } from './logger/logger.service';
import { NestFactory } from '@nestjs/core';
import { WinstonService } from './logger/winston.service';

(async function bootstrap() {
  const config = new ConfigService();
  const logger = new LoggerService(new WinstonService(config));
  const server = new ExpressAdapter();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, server, { logger });
  const { port } = config.getServerConfig();

  config.validate(logger);
  await configureGlobalSettings(app, logger, config);
  configureSwagger(app, config);
  configureMiddlewares(app, logger, config);
  await configureGracefulShutdownAndHealthChecks(app, logger, config);

  await app.listen(port);
})();
