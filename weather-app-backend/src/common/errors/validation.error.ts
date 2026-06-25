import { HttpStatus } from '@nestjs/common';
import { BusinessErrorCode } from '../enums/business-error-code.enum';
import { BusinessError } from './business.error';

export const VALIDATION_ERROR_MESSAGE = 'Validation failed';

export class ValidationError extends BusinessError {
  constructor(details?: any) {
    super(VALIDATION_ERROR_MESSAGE, HttpStatus.BAD_REQUEST, BusinessErrorCode.VALIDATION_ERROR, details);
  }
}
