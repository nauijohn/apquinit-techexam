import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { CustomLoggerService } from 'src/custom-logger/custom-logger.service';

import { HttpService } from '@nestjs/axios';
import { Controller, Get, Param } from '@nestjs/common';

import { EtherscanService } from './etherscan.service';

@Controller(':walletAddress')
export class EtherscanController {
  constructor(
    private readonly loggerService: CustomLoggerService,
    private readonly httpService: HttpService,
    private readonly etherscanService: EtherscanService,
  ) {}

  @Get('balance')
  async getBalance(@Param('walletAddress') walletAddress: string) {
    this.loggerService.verbose('test...');
    this.loggerService.debug('walletAddress: ', walletAddress);
    const { data } = await firstValueFrom(
      this.httpService
        .get<{
          status: string;
          message: string;
          result: string;
        }>(
          `${process.env.ETHERSCAN_BASE_URL}?module=account&action=balance&address=${walletAddress}&tag=latest&apikey=${process.env.ETHERSCAN_API_KEY}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.loggerService.log('error: ', error);
            throw error;
          }),
        ),
    );
    return data;
  }

  @Get('transactions')
  async getTransactions(@Param('walletAddress') walletAddress: string) {
    this.loggerService.verbose('getTransactions...');
    this.loggerService.debug('walletAddress: ', walletAddress);
    const { data } = await firstValueFrom(
      this.httpService
        .get<{
          status: string;
          message: string;
          result: string;
        }>(
          `${process.env.ETHERSCAN_BASE_URL}?module=account&action=txlist&address=${walletAddress}&tag=latest&startblock=0&endblock=99999999&page=1&offset=10&apikey=${process.env.ETHERSCAN_API_KEY}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.loggerService.log('error: ', error);
            throw error;
          }),
        ),
    );
    return data;
  }

  @Get('block')
  async getCurrentBlock(@Param('walletAddress') walletAddress: string) {
    //api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=YourApiKeyToken
    https: this.loggerService.verbose('getTransactions...');
    this.loggerService.debug('walletAddress: ', walletAddress);
    const currentBlock =
      await this.etherscanService.getCurrentBlock(walletAddress);
    const block = await this.etherscanService.getBlock(currentBlock.result);
    const currentBlock2 = await this.etherscanService.getCurrentBlock2();
    return { currentBlock, block, currentBlock2 };
  }
}
