import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { TypeOrmConfigService } from './services-config/typeorm-config.service';

@Global()
@Module({
  providers: [ConfigService, TypeOrmConfigService],
  exports: [ConfigService, TypeOrmConfigService],
})
export class ConfigModule {}
