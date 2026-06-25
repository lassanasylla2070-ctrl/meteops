import { DeepPartial } from 'typeorm';
import { ConfigSchema } from '../config.interfaces';

export const config: DeepPartial<ConfigSchema> = {
  debug: true,
  logger: {
    level: 'info',
  },
  requestLogger: {
    details: true,
  },
};
