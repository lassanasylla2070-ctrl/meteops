import { SetMetadata } from '@nestjs/common';

export const LogRequestMetadataKey = '__logRequest';

export const LogRequest = () => SetMetadata(LogRequestMetadataKey, true);
