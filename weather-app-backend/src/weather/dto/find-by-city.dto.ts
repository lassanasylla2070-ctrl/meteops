import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotBlank } from '../../common/decorators/property/is-not-blank.decorator';

export class FindByCityDto {
  @ApiProperty({ example: 'London' })
  @IsNotBlank()
  @Transform(value => value.toLowerCase().trim())
  city!: string;
}
