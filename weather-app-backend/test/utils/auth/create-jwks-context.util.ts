import createJWKSMock from 'mock-jwks';
import { ConfigService } from '../../../src/config/config.service';

export const createJwksContext = (config: ConfigService) => {
  // This creates the local PKI
  const jwksMock = createJWKSMock(config.getJWTStrategyOptions().issuer as string);

  return jwksMock;
};
