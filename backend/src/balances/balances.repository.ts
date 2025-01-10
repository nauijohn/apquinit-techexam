import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CustomLoggerService } from '../custom-logger/custom-logger.service';
import { Balance } from './balance.entity';

@Injectable()
export class BalancesRepository {
  constructor(
    @InjectRepository(Balance)
    private readonly repository: Repository<Balance>,
    private readonly loggerService: CustomLoggerService,
  ) {}

  async create(balance: Balance): Promise<Balance> {
    this.loggerService.verbose('create balance...');
    return await this.repository.save(balance);
  }

  async findByWalletAddress(walletAddress: string): Promise<Balance> {
    this.loggerService.verbose('find balance...');
    return await this.repository.findOneBy({
      walletId: walletAddress,
    });
  }

  async update(balance: Balance): Promise<UpdateResult> {
    this.loggerService.verbose('update balance...');
    return await this.repository.update(balance.id, balance);
  }

  async delete(walletAddress: string): Promise<DeleteResult> {
    this.loggerService.verbose('delete balance...');
    return await this.repository.delete(walletAddress);
  }
}
