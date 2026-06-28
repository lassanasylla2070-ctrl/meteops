import { HttpStatus } from '@nestjs/common';
import { BusinessErrorCode } from '../../common/enums/business-error-code.enum';
import { BusinessError } from '../../common/errors/business.error';

export class WeatherNotFoundError extends BusinessError {
  constructor(details?: any) {
    super('Weather data not found', HttpStatus.NOT_FOUND, BusinessErrorCode.ENTITY_NOT_FOUND_ERROR, details);
  }
}
