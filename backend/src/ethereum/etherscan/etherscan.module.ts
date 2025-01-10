import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { EtherscanController } from './etherscan.controller';
import { EtherscanService } from './etherscan.service';

@Module({
  imports: [
    HttpModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ttl: +configService.get<string>('REDIS_TTL'),
      }),
    }),
  ],
  controllers: [EtherscanController],
  providers: [EtherscanService],
})
export class EtherscanModule {}
