import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBalanceRequestDto {
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => +value)
  @AutoMap()
  @ApiProperty({
    name: 'balance',
    title: 'balance',
    description: 'balance of create request',
    type: Number,
  })
  balance: number;
}
