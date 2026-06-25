import { BusinessErrorCode } from '../enums/business-error-code.enum';

export interface ErrorResponse {
  details?: any;
  errorCode: BusinessErrorCode | string;
  message: string;
  stack?: string[];
  status: number;
}
