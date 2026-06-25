import { NestExpressApplication } from '@nestjs/platform-express';
import compression from 'compression';
import helmet from 'helmet';
import responseTime from 'response-time';
import { ConfigService } from '../../config/config.service';
import { LoggerService } from '../../logger/logger.service';
import { requestLogger } from '../middlewares/request-logger.middleware';

export const configureMiddlewares = (app: NestExpressApplication, logger: LoggerService, config: ConfigService) => {
  const { enabled: requestLoggerEnabled } = config.getRequestLoggerConfig();

  app.use(responseTime());
  app.use(helmet());
  app.use(compression());
  app.enableCors(config.getCorsConfig());

  if (requestLoggerEnabled) {
    app.use(requestLogger(logger, config));
  }
};
