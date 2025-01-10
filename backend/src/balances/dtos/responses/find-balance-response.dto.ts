import { ApiProperty } from '@nestjs/swagger';

class FindBalanceResponseDtoData {
  @ApiProperty({
    name: 'id',
    title: 'id',
    description: 'id of find balance response',
    type: FindBalanceResponseDtoData,
    example: '08781e41-2326-46ef-b2ce-c3e16c236db8',
  })
  id: string;

  @ApiProperty({
    name: 'walletId',
    title: 'walletId',
    description: 'walletId of find balance response',
    type: FindBalanceResponseDtoData,
    example: 'test',
  })
  walletId: string;

  @ApiProperty({
    name: 'balance',
    title: 'balance',
    description: 'balance of find balance response',
    type: FindBalanceResponseDtoData,
    example: 23,
  })
  balance: number;
}

export class FindBalanceResponseDto {
  @ApiProperty({
    name: 'data',
    title: 'data',
    description: 'data of find balance response',
    type: FindBalanceResponseDtoData,
  })
  data: FindBalanceResponseDtoData;
}
