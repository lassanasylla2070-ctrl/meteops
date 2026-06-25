import { HttpStatus } from '@nestjs/common';
import { BusinessErrorCode } from '../../common/enums/business-error-code.enum';
import { BusinessError } from '../../common/errors/business.error';

export class DataProviderFetchError extends BusinessError {
  constructor(message: string, details?: any) {
    super(message, HttpStatus.BAD_REQUEST, BusinessErrorCode.EXTERNAL_SERVICE_ERROR, details);
  }
}
