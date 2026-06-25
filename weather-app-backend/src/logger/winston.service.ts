import { Injectable } from '@nestjs/common';
import { Chalk, Instance } from 'chalk';
import { DateTime } from 'luxon';
import util from 'util';
import { config, createLogger, format, Logger, transports } from 'winston';
import { ConfigService } from '../config/config.service';

@Injectable()
export class WinstonService {
  public readonly logger: Logger;

  private readonly chalk: Chalk;

  constructor(private readonly configService: ConfigService) {
    this.chalk = new Instance({ level: this.configService.isLocal() ? 2 : 0 });
    const { combine, printf, metadata } = format;
    const { colorized, level: logLevel, enabled } = this.configService.getLoggerConfig();

    const customFormat = printf(
      ({ level, message, meta }) => `${this.getTime()} [ ${this.formatLogLevel(level)} ]: ${this.chalk.yellow(message)}${this.formatMeta(meta)}`,
    );

    const prettyJson = printf(({ level, message, meta }) => {
      if (typeof meta === 'string') {
        return JSON.stringify({ message: `${message} - ${meta}`, level });
      }

      return JSON.stringify({ message, level, ...meta });
    });

    this.logger = createLogger({
      silent: !enabled,
      level: logLevel,
      levels: config.syslog.levels,
      format: colorized ? combine(customFormat, metadata()) : prettyJson,
      transports: [new transports.Console()],
    });
  }

  private readonly formatLogLevel = (level: string) => {
    const upperCasedLevel = level.toUpperCase();
    switch (upperCasedLevel) {
      case 'INFO':
        return this.chalk.cyan(upperCasedLevel);
      case 'WARNING':
        return this.chalk.yellow(upperCasedLevel);
      case 'ERROR':
        return this.chalk.red(upperCasedLevel);
      default:
        return this.chalk.gray(upperCasedLevel);
    }
  };

  private readonly formatMeta = (meta: any = {}) => {
    if (typeof meta === 'string') {
      return ` - ${meta}`;
    }

    const hasKeys = Object.keys(meta).length > 0;

    return hasKeys ? `\n${util.inspect(meta, { depth: null, colors: true })}` : '';
  };

  private readonly getTime = () => this.chalk.blue(DateTime.local().toFormat('TT.SSS dd-LL-yyyy'));
}
