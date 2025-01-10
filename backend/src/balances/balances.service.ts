import { DeleteResult, UpdateResult } from 'typeorm';

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';

import { CustomLoggerService } from '../custom-logger/custom-logger.service';
import { Balance } from './balance.entity';
import { BalancesRepository } from './balances.repository';
import { CreateBalanceRequestDto } from './dtos/requests/create-balance-request.dto';
import { UpdateBalanceRequestDto } from './dtos/requests/update-balance-request.dto';

@Injectable()
export class BalancesService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly loggerService: CustomLoggerService,
    private readonly balancesRepository: BalancesRepository,
  ) {}

  async create(
    walletAddress: string,
    requestDto: CreateBalanceRequestDto,
  ): Promise<Balance> {
    this.loggerService.verbose('create balance...');

    const entity = this.mapper.map(
      requestDto,
      CreateBalanceRequestDto,
      Balance,
    );
    entity.walletId = walletAddress;
    this.loggerService.log('entity: ', entity);

    return await this.balancesRepository.create(entity);
  }

  async find(walletAddress: string): Promise<Balance> {
    this.loggerService.verbose('find balance...');
    return await this.balancesRepository.findByWalletAddress(walletAddress);
  }

  async update(
    walletAddress: string,
    requestDto: UpdateBalanceRequestDto,
  ): Promise<UpdateResult> {
    this.loggerService.verbose('update balance...');

    const entity = await this.find(walletAddress);
    if (!entity) throw new NotFoundException('Balance not found');

    const newEntity = this.mapper.map(
      requestDto,
      UpdateBalanceRequestDto,
      Balance,
    );
    newEntity.id = entity.id;

    return await this.balancesRepository.update(newEntity);
  }

  async delete(walletAddress: string): Promise<DeleteResult> {
    this.loggerService.verbose('delete balance...');
    return await this.balancesRepository.delete(walletAddress);
  }
}
