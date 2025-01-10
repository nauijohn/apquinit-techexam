import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBalanceResponseDto {
  @AutoMap()
  @ApiProperty({
    name: 'id',
    title: 'id',
    description: 'id of balance entity',
    type: Number,
    example: '08781e41-2326-46ef-b2ce-c3e16c236db8',
  })
  id: string;

  @ApiProperty({
    name: 'message',
    title: 'message',
    description: 'message of create response',
    type: String,
    example: 'Balance created successfully',
  })
  message: string;
}
