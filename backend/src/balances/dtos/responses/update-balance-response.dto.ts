import { ApiProperty } from '@nestjs/swagger';

export class UpdateBalanceResponseDto {
  @ApiProperty({
    name: 'statusCode',
    title: 'statusCode',
    description: 'statusCode of update response',
    type: Number,
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    name: 'message',
    title: 'message',
    description: 'message of update response',
    type: String,
    example: 'Balance updated successfully',
  })
  message: string;

  constructor(message: string, statusCode: number = 200) {
    this.statusCode = statusCode;
    this.message = message;
  }
}
