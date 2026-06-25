/**
 * Typeorm doesn't provide type for QueryFailedError because it is created specifically for used database type.
 */
export interface QueryFailedErrorInterface {
  code?: string;
  column?: string;
  constraint?: string;
  detail?: string;
  message: string;
  parameters?: any[];
  query?: string;
  schema?: string;
  stack?: string;
  table?: string;
}
