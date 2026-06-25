import { logger } from '@utils/logger';

const { REACT_APP_INSTANCE_NAME } = process.env;

export const captureError = (error: unknown | Error, variables?: unknown) => {
  // Can be pushed to e.g. Sentry
  logger.error(error, variables, REACT_APP_INSTANCE_NAME);
};
