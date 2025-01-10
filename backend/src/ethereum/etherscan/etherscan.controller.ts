import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';

import { CustomLoggerService } from '../../custom-logger/custom-logger.service';
import { EtherscanService } from './etherscan.service';

@Controller()
export class EtherscanController {
  constructor(
    private readonly loggerService: CustomLoggerService,
    private readonly etherscanService: EtherscanService,
  ) {}

  @Get(':walletAddress/balance')
  async getBalance(@Param('walletAddress') walletAddress: string) {
    this.loggerService.verbose('test...');
    this.loggerService.debug('walletAddress: ', walletAddress);

    const balance =
      await this.etherscanService.getBalanceByWalletAddress(walletAddress);

    return balance;
  }

  @Get('block-number')
  @UseInterceptors(CacheInterceptor)
  async getCurrentBlockNumber() {
    this.loggerService.verbose('getCurrentBlockNumber...');
    const currentBlockNumber =
      await this.etherscanService.getCurrentBlockNumber();
    return currentBlockNumber;
  }

  @Get('gas-price')
  @UseInterceptors(CacheInterceptor)
  async getGasPrice() {
    this.loggerService.verbose('getGasPrice...');
    return await this.etherscanService.getGasPrice();
  }
}
