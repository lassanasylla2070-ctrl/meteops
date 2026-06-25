import { Exclude, Expose, Transform } from 'class-transformer';
import { startCase } from 'lodash';
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Weather } from '../models/weather.model';
import { WeatherState } from './enums/weather-state.enum';
import { MetaWeatherCreation } from './models/meta-weather-creation.model';

@Entity({ name: 'weather' })
export class MetaWeather implements Weather {
  @PrimaryColumn('date')
  date!: string;

  @Exclude()
  @PrimaryColumn('text')
  query!: string;

  @Transform(value => startCase(value))
  @Column('text')
  city!: string;

  @Column('text')
  state!: string;

  @Exclude()
  @Column('text')
  stateAbbr!: WeatherState;

  @Column('float')
  windDirection!: number;

  @Column('text')
  windDirectionCompass!: string;

  @Column('float')
  windSpeed!: number;

  @Column('float', { nullable: true })
  airPressure?: number;

  @Column('float')
  humidity!: number;

  @Column('int')
  predictability!: number;

  @Column('float', { nullable: true })
  minTemp?: number;

  @Column('float', { nullable: true })
  maxTemp?: number;

  @Column('float', { nullable: true })
  avgTemp?: number;

  @CreateDateColumn()
  createdAt!: string;

  @UpdateDateColumn()
  updatedAt!: string;

  @Expose()
  get iconUrl(): string {
    return `https://www.metaweather.com/static/img/weather/${this.stateAbbr}.svg`;
  }

  constructor(creationModel: MetaWeatherCreation) {
    Object.assign(this, creationModel);
  }
}
