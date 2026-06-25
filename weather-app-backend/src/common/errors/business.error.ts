import { HttpStatus } from '@nestjs/common';
import { BusinessErrorCode } from '../enums/business-error-code.enum';
import { ErrorResponse } from '../interfaces/error-response.interface';

export class BusinessError extends Error {
  public readonly errorCode: string;

  /**
   * @param message Human readable error description.
   * @param status Status for HTTP exception.
   * @param errorCode Passed code or HttpStatus code by default.
   * @param details
   */
  constructor(public readonly message: string, public readonly status: number, errorCode?: BusinessErrorCode, public readonly details?: any) {
    super(message);
    this.errorCode = errorCode || HttpStatus[status];
  }

  getResponse(showDetails = false): ErrorResponse {
    if (showDetails) {
      return this.getDetailedResponse();
    }

    return { message: this.message, status: this.status, errorCode: this.errorCode };
  }

  private getDetailedResponse(): ErrorResponse {
    // message is not error property, it exists in prototype so we have to destruct it in that way
    const { message, errorCode, status, stack = '' } = this;
    const response: ErrorResponse = { message, status, errorCode, stack: stack.split('\n'), details: {} };
    if (this.details?.constructor === Error) {
      response.details = { message: this.details.message };
    } else {
      response.details = this.details;
    }

    return response;
  }
}
