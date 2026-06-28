import { Module } from '@nestjs/common';
import { MetaWeatherModule } from '../weather-data-provider/meta-weather/meta-weather.module';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';

@Module({
  imports: [MetaWeatherModule],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
