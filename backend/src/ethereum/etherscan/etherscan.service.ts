import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { CustomLoggerService } from '../../custom-logger/custom-logger.service';

@Injectable()
export class EtherscanService {
  constructor(
    private readonly loggerService: CustomLoggerService,
    private readonly httpService: HttpService,
  ) {}

  async getCurrentBlock(walletAddress: string) {
    this.loggerService.verbose('getCurrentBlock...');
    const { data } = await firstValueFrom(
      this.httpService
        .get<{
          status: string;
          message: string;
          result: string;
        }>(
          `${process.env.ETHERSCAN_BASE_URL}?module=proxy&action=eth_blockNumber&address=${walletAddress}&apikey=${process.env.ETHERSCAN_API_KEY}`,
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

  async getCurrentBlock2() {
    this.loggerService.verbose('getCurrentBlock...');
    const { data } = await firstValueFrom(
      this.httpService
        .get<{
          status: string;
          message: string;
          result: string;
        }>(
          `${process.env.ETHERSCAN_BASE_URL}?module=proxy&action=eth_getBlockByNumber&tag=latest&boolean=true&apikey=${process.env.ETHERSCAN_API_KEY}`,
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

  async getBlock(blockNumber: string) {
    this.loggerService.verbose('getCurrentBlock...');
    console.log('blockNumber: ', blockNumber);
    const timestamp = Math.floor(new Date('2012.08.10').getTime() / 1000);
    const { data } = await firstValueFrom(
      this.httpService
        .get<{
          status: string;
          message: string;
          result: string;
        }>(
          `${process.env.ETHERSCAN_BASE_URL}?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=after&apikey=${process.env.ETHERSCAN_API_KEY}`,
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
}
