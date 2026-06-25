import { LogRequestMetadataKey } from '../decorators/method/log-request.decorator';

export {};

declare global {
  namespace Express {
    export interface Request {
      [LogRequestMetadataKey]?: boolean;
    }

    export interface Response {
      _headers: {
        'content-length': number;
        'x-response-time': string;
      };
    }
  }
}
