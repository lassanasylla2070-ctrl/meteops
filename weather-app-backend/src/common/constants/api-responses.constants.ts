import { Constructor } from '@nestjs/common/utils/merge-with-values.util';
import { ApiResponseMetadata } from '@nestjs/swagger';

declare type OKResponse = (returnedType?: Constructor<any>, isArray?: boolean) => ApiResponseMetadata;

interface ApiResponses {
  BAD_REQUEST: ApiResponseMetadata;
  INTERNAL_SERVER_ERROR: ApiResponseMetadata;
  NOT_FOUND: ApiResponseMetadata;
  OK: OKResponse;
}

export const API_RESPONSES: ApiResponses = {
  BAD_REQUEST: { description: 'Validation failed' },
  INTERNAL_SERVER_ERROR: { description: 'Internal error e.g. database connection error' },
  NOT_FOUND: { description: 'Data not found' },
  OK: (returnedType?: Constructor<any>, isArray = false) => ({ description: `Data successfully fetched`, type: returnedType, isArray }),
};
