import { Injectable, Logger as NestLogger } from '@nestjs/common';
import { formatError } from '../common/errors/utils/format-error.util';
import { LoggerMetaInterfaces } from './logger.interfaces';
import { WinstonService } from './winston.service';

@Injectable()
export class LoggerService extends NestLogger {
  constructor(private readonly winstonLogger: WinstonService) {
    super();
  }

  debug(message: string, context?: string, meta?: LoggerMetaInterfaces) {
    this.winstonLogger.logger.debug(message, { context, meta });
  }

  error(message: string, trace?: string, context?: string, meta?: LoggerMetaInterfaces | Error) {
    if (meta instanceof Error) {
      return this.winstonLogger.logger.error(message, { meta: formatError(meta), trace, context });
    }

    return this.winstonLogger.logger.error(message, { meta, trace, context });
  }

  log(message: string, context?: string, meta?: LoggerMetaInterfaces) {
    this.winstonLogger.logger.info(message, { context, meta });
  }

  verbose(message: string, context?: string, meta?: LoggerMetaInterfaces) {
    this.winstonLogger.logger.notice(message, { context, meta });
  }

  warn(message: string, context?: string, meta?: LoggerMetaInterfaces) {
    this.winstonLogger.logger.warning(message, { context, meta });
  }
}
