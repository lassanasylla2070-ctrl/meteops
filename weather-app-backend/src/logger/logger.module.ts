import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { TypeOrmLoggerService } from './typeorm-logger.service';
import { WinstonService } from './winston.service';

@Global()
@Module({
  providers: [WinstonService, LoggerService, TypeOrmLoggerService],
  exports: [LoggerService, TypeOrmLoggerService],
})
export class LoggerModule {}
