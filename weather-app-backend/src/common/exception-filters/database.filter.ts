import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { LoggerService } from '../../logger/logger.service';
import { DatabaseError } from '../errors/database.error';
import { QueryFailedErrorInterface } from '../interfaces/query-failed-error.interface';

@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  constructor(private readonly showDetails: boolean, private readonly logger: LoggerService) {}

  catch(exception: QueryFailedErrorInterface, host: ArgumentsHost) {
    const defaultError = { message: exception.detail || 'Database error' };
    const databaseException = new DatabaseError(this.showDetails ? exception : defaultError);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { url, method } = ctx.getRequest<Request>();

    this.logger.error(databaseException.message, exception.stack, DatabaseExceptionFilter.name, databaseException);

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      url,
      method,
      ...databaseException,
    });
  }
}
