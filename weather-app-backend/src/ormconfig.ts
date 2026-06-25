import { ConfigService } from './config/config.service';
import { TypeOrmConfigService } from './config/services-config/typeorm-config.service';

export = new TypeOrmConfigService(new ConfigService()).createTypeOrmOptions();
