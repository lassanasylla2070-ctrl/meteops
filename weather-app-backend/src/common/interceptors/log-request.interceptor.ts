import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { LogRequestMetadataKey } from '../decorators/method/log-request.decorator';

@Injectable()
export class LogRequestInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const shouldLogRequest = this.reflector.get<boolean>(LogRequestMetadataKey, context.getHandler()) || false;
    const request = context.switchToHttp().getRequest();
    request[LogRequestMetadataKey] = shouldLogRequest;

    return next.handle();
  }
}
