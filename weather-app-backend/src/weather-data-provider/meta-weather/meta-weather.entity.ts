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
  const iconMap: Record<string, string> = {
    sn: '13d', sl: '13d', h: '13d',
    t: '11d',
    hr: '10d', lr: '10d', s: '09d',
    hc: '04d', lc: '02d',
    c: '01d',
  };
  const code = iconMap[this.stateAbbr] || '01d';
  return `https://openweathermap.org/img/wn/${code}@2x.png`;
}

  constructor(creationModel: MetaWeatherCreation) {
    Object.assign(this, creationModel);
  }
}
