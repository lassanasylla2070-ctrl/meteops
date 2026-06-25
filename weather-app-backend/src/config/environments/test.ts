import { DeepPartial } from 'typeorm';
import { ConfigSchema } from '../config.interfaces';

export const config: DeepPartial<ConfigSchema> = {
  debug: false,
  db: {
    database: 'weather_e2e',
  },
  logger: {
    enabled: false,
  },
  requestLogger: {
    enabled: false,
  },
};
