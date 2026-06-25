import { createTerminus } from '@godaddy/terminus';
import { ShutdownSignal } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { TypeOrmHealthIndicator } from '@nestjs/terminus';
import { Connection } from 'typeorm';
import { ConfigService } from '../../config/config.service';
import { LoggerService } from '../../logger/logger.service';
import { Routes } from '../enums/routes.enum';

export const configureGracefulShutdownAndHealthChecks = async (app: NestExpressApplication, logger: LoggerService, config: ConfigService) => {
  const { apiPrefix, version } = config.getServerConfig();
  const typeorm = await app.resolve(TypeOrmHealthIndicator);

  createTerminus(app.getHttpServer(), {
    signals: [ShutdownSignal.SIGINT, ShutdownSignal.SIGTERM],
    onSignal: async () => {
      logger.log(`Server is starting cleanup...`);

      const connection = app.get(Connection);
      logger.log('Closing database connection...');
      if (connection.isConnected) {
        await connection.close();
      }
    },
    onShutdown: async () => logger.log('Cleanup finished, server is shutting down...'),
    logger: (msg: string, err: Error) => {
      if (err) {
        logger.error(err.message, err.stack, 'GracefulShutdown', err);
      } else {
        logger.log(msg);
      }
    },
    healthChecks: {
      [`${apiPrefix}/${Routes.HEALTHCHECK}`]: async () => {
        await typeorm.pingCheck('database');

        return { version };
      },
    },
    timeout: config.getGracefulShutdownTimeout(),
  });
};
