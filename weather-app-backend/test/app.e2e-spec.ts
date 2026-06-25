import { HttpStatus, INestApplication } from '@nestjs/common';
import { DateTime } from 'luxon';
import request from 'supertest';
import {
  IsCurrentMonthDateValidatorMessage,
  IsCurrentMonthDateValidatorName,
} from '../src/common/decorators/property/is-current-month-date.decorator';
import { BusinessErrorCode } from '../src/common/enums/business-error-code.enum';
import { Routes } from '../src/common/enums/routes.enum';
import { ErrorResponse } from '../src/common/interfaces/error-response.interface';
import { ConfigService } from '../src/config/config.service';
import { Weather } from '../src/weather-data-provider/models/weather.model';
import { FindByCityAndDateDto } from '../src/weather/dto/find-by-city-and-date.dto';
import { TestDatabaseService } from './database/test-database.service';
import { createTestAppModule } from './utils/create-test-app-module';

// Sample e2e test, weather API calls could be mocked here using
describe('AppController (e2e)', () => {
  let server: any;
  let app: INestApplication;
  const config = new ConfigService();
  const { apiPrefix } = config.getServerConfig();

  beforeAll(async () => {
    app = await createTestAppModule(config);
    await app.init();
    await app.get(TestDatabaseService).prepareDatabase();
    server = app.getHttpServer();
  });

  it(`[GET] /${Routes.HEALTHCHECK}`, async () => {
    const url = `${apiPrefix}/${Routes.HEALTHCHECK}`;
    const { version } = config.getServerConfig();
    const expectedBody = {
      status: 'ok',
      info: { version },
      details: { version },
    };

    return request(server).get(url).expect(HttpStatus.OK).expect(expectedBody);
  });

  it(`[GET] /${Routes.WEATHER}/day-in-month - bad request, no queries (validation error)`, async () => {
    const url = `${apiPrefix}/${Routes.WEATHER}/day-in-month`;
    const { body }: { body: ErrorResponse } = await request(server).get(url).expect(HttpStatus.BAD_REQUEST);

    expect(body).toBeDefined();
    expect(body.errorCode).toEqual(BusinessErrorCode.VALIDATION_ERROR);
  });

  it(`[GET] /${Routes.WEATHER}/day-in-month - bad request, day out of month (validation error)`, async () => {
    const url = `${apiPrefix}/${Routes.WEATHER}/day-in-month`;
    const queries: FindByCityAndDateDto = { date: DateTime.local().minus({ months: 2 }), city: 'London' };
    const { body }: { body: ErrorResponse } = await request(server).get(url).query(queries).expect(HttpStatus.BAD_REQUEST);

    expect(body).toBeDefined();
    expect(body.errorCode).toEqual(BusinessErrorCode.VALIDATION_ERROR);
    expect(body.details[0].constraints).toEqual({ [IsCurrentMonthDateValidatorName]: IsCurrentMonthDateValidatorMessage });
  });

  it(`[GET] /${Routes.WEATHER}/day-in-month - successful request`, async () => {
    const url = `${apiPrefix}/${Routes.WEATHER}/day-in-month`;
    const queries = { date: DateTime.local().toISO(), city: 'London' };
    const expectedKeys: (keyof Weather)[] = [
      'iconUrl',
      'humidity',
      'date',
      'avgTemp',
      'airPressure',
      'city',
      'createdAt',
      'maxTemp',
      'minTemp',
      'predictability',
      'state',
      'updatedAt',
      'windDirection',
      'windDirectionCompass',
      'windSpeed',
    ];

    const { body } = await request(server).get(url).query(queries).expect(HttpStatus.OK);

    expect(body).toBeDefined();
    expect(Object.keys(body).sort()).toEqual(expectedKeys.sort());
  });

  afterAll(async () => {
    await app.get(TestDatabaseService).dropDatabase();
    await app.close();
  });
});
