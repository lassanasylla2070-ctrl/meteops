import { BusinessErrorCode } from '../enums/business-error-code.enum';

/**
 * API error response schema
 */
export interface ErrorResponse {
  details?: any;
  errorCode: BusinessErrorCode;
  message: string;
  stack?: string[];
}
