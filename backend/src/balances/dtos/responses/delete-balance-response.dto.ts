import { ApiProperty } from '@nestjs/swagger';

export class DeleteBalanceResponseDto {
  @ApiProperty({
    name: 'statusCode',
    title: 'statusCode',
    description: 'statusCode of delete response',
    type: Number,
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    name: 'message',
    title: 'message',
    description: 'message of delete response',
    type: String,
    example: 'Balance deleted successfully',
  })
  message: string;

  constructor(message: string, statusCode: number = 200) {
    this.statusCode = statusCode;
    this.message = message;
  }
}
