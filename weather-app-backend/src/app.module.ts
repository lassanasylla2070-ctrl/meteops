import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { TypeOrmConfigService } from './config/services-config/typeorm-config.service';
import { LoggerModule } from './logger/logger.module';
import { MetaWeatherModule } from './weather-data-provider/meta-weather/meta-weather.module';
import { WeatherModule } from './weather/weather.module';
import { LogRequestInterceptor } from './common/interceptors/log-request.interceptor';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    TerminusModule,
    ConfigModule,
    LoggerModule,
    WeatherModule,
    MetaWeatherModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LogRequestInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
