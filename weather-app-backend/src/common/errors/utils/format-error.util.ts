import { trim } from 'lodash';

export const formatError = ({ message, stack, ...details }: Error) => ({
  message,
  stack: stack?.split('\n').map(trim),
  ...details,
});
