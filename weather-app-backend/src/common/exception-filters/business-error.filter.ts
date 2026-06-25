import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { LoggerService } from '../../logger/logger.service';
import { BusinessError } from '../errors/business.error';

@Catch(BusinessError)
export class BusinessErrorFilter implements ExceptionFilter {
  constructor(private readonly showDetails: boolean, private readonly logger: LoggerService) {}

  catch(exception: BusinessError, host: ArgumentsHost) {
    this.logger.error(exception.message, exception.stack, BusinessErrorFilter.name, exception);
    const response = host.switchToHttp().getResponse<Response>();

    return response.status(exception.status).json(exception.getResponse(this.showDetails));
  }
}
