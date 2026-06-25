import { InternalErrorType } from '../enums/internal-error-type.enum';
import { QueryFailedErrorInterface } from '../interfaces/query-failed-error.interface';
import { normalizeMultilineErrorString } from './utils/normalize-multiline-error-string.util';

export class DatabaseError extends Error {
  public readonly code?: string;
  public readonly column?: string;
  public readonly constraint?: string;
  public readonly detail?: string;
  public readonly message: string;
  public readonly parameters?: string | number[];
  public readonly query?: string[];
  public readonly schema?: string;
  public readonly stackTrace?: string[];
  public readonly table?: string;
  public readonly type = InternalErrorType.DATABASE;

  constructor(exception: QueryFailedErrorInterface) {
    super(exception.message);

    this.message = exception.message;
    this.detail = exception.detail;
    this.code = exception.code;
    this.table = exception.table;
    this.column = exception.column;
    this.schema = exception.schema;
    this.constraint = exception.constraint;
    this.parameters = exception.parameters;
    if (exception.query) {
      this.query = normalizeMultilineErrorString(exception.query);
    }

    if (exception.stack) {
      this.stackTrace = normalizeMultilineErrorString(exception.stack);
    }
  }
}
