import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../../config/config.service';
import { MetaWeatherClientService } from './meta-weather-client.service';
import { MetaWeather } from './meta-weather.entity';
import { MetaWeatherService } from './meta-weather.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MetaWeather]),
    HttpModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const { apiUrl } = configService.getWeatherConfig();

        return { baseURL: apiUrl };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [MetaWeatherClientService, { provide: 'WEATHER_DATA_PROVIDER', useClass: MetaWeatherService }],
  exports: ['WEATHER_DATA_PROVIDER'],
})
export class MetaWeatherModule {}
