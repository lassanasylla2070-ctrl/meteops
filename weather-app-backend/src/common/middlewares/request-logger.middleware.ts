import { Request, Response } from 'express';
import fileSize from 'filesize';
import { ParsedQs } from 'qs';
import { UAParser } from 'ua-parser-js';
import { ConfigService } from '../../config/config.service';
import { LoggerService } from '../../logger/logger.service';
import { LogRequestMetadataKey } from '../decorators/method/log-request.decorator';

interface RequestLoggerMeta {
  'User-Agent': IUAParser.IResult;
  Authorization?: string;
  body?: { [key: string]: string };
  ip: string;
  method: string;
  params?: { [key: string]: string };
  query?: ParsedQs;
  size: string;
  statusCode: number;
  statusMessage: string;
  time: string;
  url: string;
}

export const requestLogger = (loggerService: LoggerService, configService: ConfigService) => {
  return (request: Request, response: Response, next: () => void) => {
    response.on('finish', () => {
      const shouldLogRequest = request[LogRequestMetadataKey];
      if (!shouldLogRequest) {
        return;
      }

      const { details: showDetails } = configService.getRequestLoggerConfig();
      const meta: RequestLoggerMeta = {
        'User-Agent': new UAParser(request.headers['user-agent']).getResult(),
        ip: request.ip,
        size: fileSize(response._headers['content-length'] || 0),
        statusCode: response.statusCode,
        statusMessage: response.statusMessage,
        time: response._headers['x-response-time'],
        url: request.path,
        method: request.method,
      };

      if (showDetails) {
        meta.Authorization = request.headers.authorization;
        meta.params = request.params;
        meta.query = request.query;
        meta.body = request.body;
      }

      const message = `${meta.method} ${meta.url} - ${meta.statusCode} ${meta.statusMessage}`;
      const logLevel = Math.floor(response.statusCode / 100); // map status code to log level
      const context = 'RequestLog';
      switch (logLevel) {
        case 4:
          return loggerService.warn(message, context, meta);
        case 5:
          return loggerService.error(message, undefined, context, meta);
        default:
          return loggerService.log(message, context, meta);
      }
    });

    next();
  };
};
