import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CustomLoggerService } from '../custom-logger/custom-logger.service';
import { Balance } from './balance.entity';
import { BalancesService } from './balances.service';
import { CreateBalanceRequestDto } from './dtos/requests/create-balance-request.dto';
import { UpdateBalanceRequestDto } from './dtos/requests/update-balance-request.dto';
import { CreateBalanceResponseDto } from './dtos/responses/create-balance-response.dto';
import { DeleteBalanceResponseDto } from './dtos/responses/delete-balance-response.dto';
import { FindBalanceResponseDto } from './dtos/responses/find-balance-response.dto';
import { UpdateBalanceResponseDto } from './dtos/responses/update-balance-response.dto';

@Controller('balances')
@ApiTags('balances')
export class BalancesController {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly loggerService: CustomLoggerService,
    private readonly balancesService: BalancesService,
  ) {}

  @Post(':walletAddress')
  @ApiCreatedResponse({ type: CreateBalanceResponseDto })
  async create(
    @Param('walletAddress') walletAddress: string,
    @Body() requestDto: CreateBalanceRequestDto,
  ): Promise<CreateBalanceResponseDto> {
    this.loggerService.verbose('create balance...');
    const entity = await this.balancesService.create(walletAddress, requestDto);
    const response = this.mapper.map(entity, Balance, CreateBalanceResponseDto);
    response.message = entity
      ? 'Balance created successfully'
      : 'Balance create failed';
    return response;
  }

  @Get(':walletAddress')
  @ApiOkResponse({ type: FindBalanceResponseDto })
  async find(
    @Param('walletAddress') walletAddress: string,
  ): Promise<FindBalanceResponseDto> {
    this.loggerService.verbose('find balance...');
    const entity = await this.balancesService.find(walletAddress);
    return this.mapper.map(entity, Balance, FindBalanceResponseDto);
  }

  @Put(':walletAddress')
  @ApiOkResponse({ type: UpdateBalanceResponseDto })
  async update(
    @Param('walletAddress') walletAddress: string,
    @Body() requestDto: UpdateBalanceRequestDto,
  ): Promise<UpdateBalanceResponseDto> {
    this.loggerService.verbose('update balance...');
    const { affected } = await this.balancesService.update(
      walletAddress,
      requestDto,
    );
    if (affected === 0)
      throw new InternalServerErrorException('Balance update failed');
    return new UpdateBalanceResponseDto('Balance updated successfully');
  }

  @Delete(':walletAddress')
  @ApiOkResponse({ type: DeleteBalanceResponseDto })
  async delete(
    @Param('walletAddress') walletAddress: string,
  ): Promise<DeleteBalanceResponseDto> {
    this.loggerService.verbose('delete balance...');
    const { affected } = await this.balancesService.delete(walletAddress);
    if (affected === 0)
      throw new InternalServerErrorException('Balance delete failed');
    return new DeleteBalanceResponseDto('Balance deleted successfully');
  }
}
