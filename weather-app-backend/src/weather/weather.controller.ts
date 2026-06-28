import { Controller, Get, Query } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { API_RESPONSES } from '../common/constants/api-responses.constants';
import { LogRequest } from '../common/decorators/method/log-request.decorator';
import { Routes } from '../common/enums/routes.enum';
import { Weather } from '../weather-data-provider/models/weather.model';
import { FindByCityDto } from './dto/find-by-city.dto';
import { FindByCityAndDateDto } from './dto/find-by-city-and-date.dto';
import { WeatherService } from './weather.service';

@ApiTags(Routes.WEATHER)
@Controller(Routes.WEATHER)
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @LogRequest()
  @Get('day-in-month')
  @ApiOperation({ description: 'Returns weather forecast for selected day and city' })
  @ApiOkResponse(API_RESPONSES.OK(Weather))
  @ApiNotFoundResponse(API_RESPONSES.NOT_FOUND)
  @ApiInternalServerErrorResponse(API_RESPONSES.INTERNAL_SERVER_ERROR)
  findWeatherByDay(@Query() { city, date }: FindByCityAndDateDto): Promise<Weather> {
    return this.weatherService.findWeatherByDay(city, date);
  }

  @LogRequest()
  @Get('forecast')
  @ApiOperation({ description: 'Returns 5-day weather forecast for city' })
  @ApiOkResponse(API_RESPONSES.OK(Weather, true))
  @ApiNotFoundResponse(API_RESPONSES.NOT_FOUND)
  @ApiInternalServerErrorResponse(API_RESPONSES.INTERNAL_SERVER_ERROR)
  findWeatherForecast(@Query() { city }: FindByCityDto): Promise<Weather[]> {
    return this.weatherService.findWeatherForecast(city);
  }
}
