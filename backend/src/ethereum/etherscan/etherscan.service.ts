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

  async getBalanceByWalletAddress(walletAddress: string) {
    this.loggerService.verbose('getBalanceByWalletAddress...');

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

  async getCurrentBlockNumber() {
    this.loggerService.verbose('getCurrentBlockNumber...');

    const { data } = await firstValueFrom(
      this.httpService
        .get<{
          status: string;
          message: string;
          result: string;
        }>(
          `${process.env.ETHERSCAN_BASE_URL}?module=proxy&action=eth_blockNumber&apikey=${process.env.ETHERSCAN_API_KEY}`,
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

  async getGasPrice() {
    this.loggerService.verbose('getGasPrice...');

    const { data } = await firstValueFrom(
      this.httpService
        .get<{
          status: string;
          message: string;
          result: string;
        }>(
          `${process.env.ETHERSCAN_BASE_URL}?module=proxy&action=eth_gasPrice&apikey=${process.env.ETHERSCAN_API_KEY}`,
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
