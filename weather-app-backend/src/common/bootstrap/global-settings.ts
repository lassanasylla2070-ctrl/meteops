import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '../../config/config.service';
import { LoggerService } from '../../logger/logger.service';
import { ValidationError } from '../errors/validation.error';
import { BusinessErrorFilter } from '../exception-filters/business-error.filter';
import { DatabaseExceptionFilter } from '../exception-filters/database.filter';

export const configureGlobalSettings = async (app: NestExpressApplication, logger: LoggerService, config: ConfigService) => {
  const { apiPrefix } = config.getServerConfig();

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: !config.isDebug(),
      transform: true,
      exceptionFactory: ([...details]) => new ValidationError(details),
    }),
  );
  app.useGlobalFilters(
    new BusinessErrorFilter(config.isDebug(), logger),
    new DatabaseExceptionFilter(config.isDebug(), logger),
  );
  app.setGlobalPrefix(apiPrefix);
};
