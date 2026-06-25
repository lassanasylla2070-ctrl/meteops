import { DeepPartial } from 'typeorm';
import { ConfigSchema } from '../config.interfaces';

export const config: DeepPartial<ConfigSchema> = {
  debug: true,
  logger: {
    colorized: true,
    level: 'info',
  },
  requestLogger: {
    details: true,
  },
};
