import { ApiProperty } from '@nestjs/swagger';

export class Weather {
  @ApiProperty()
  city!: string;

  @ApiProperty()
  date!: string;

  @ApiProperty()
  state!: string;

  @ApiProperty({ description: 'degrees' })
  windDirection!: number;

  @ApiProperty()
  windDirectionCompass!: string;

  @ApiProperty({ description: 'mph' })
  windSpeed!: number;

  @ApiProperty({ description: 'mbar', required: false })
  airPressure?: number;

  @ApiProperty({ description: 'percentage' })
  humidity!: number;

  @ApiProperty({ description: 'percentage' })
  predictability!: number;

  @ApiProperty({ description: 'centigrade', required: false })
  minTemp?: number;

  @ApiProperty({ description: 'centigrade', required: false })
  maxTemp?: number;

  @ApiProperty({ description: 'centigrade', required: false })
  avgTemp?: number;

  @ApiProperty({ format: 'hostname' })
  iconUrl!: string;

  @ApiProperty({ format: 'date-time' })
  createdAt!: string;

  @ApiProperty({ format: 'date-time' })
  updatedAt!: string;
}
