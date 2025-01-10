import { redisStore } from 'cache-manager-redis-yet';

import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BalancesModule } from './balances/balances.module';
import { CustomLoggerModule } from './custom-logger/custom-logger.module';
import { EthereumModule } from './ethereum/ethereum.module';
import { EtherscanModule } from './ethereum/etherscan/etherscan.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { RequestIdMiddleware } from './middlewares/request-id.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<string>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: async () =>
          await redisStore({
            socket: {
              host: configService.get<string>('REDIS_HOST'),
              port: +configService.get<string>('REDIS_PORT'),
            },
          }),
        ttl: +configService.get<string>('REDIS_TTL'),
        isGlobal: true,
      }),
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    CustomLoggerModule,
    EthereumModule,
    BalancesModule,
    RouterModule.register([
      {
        path: 'ethereum',
        children: [
          {
            path: 'etherscan',
            module: EtherscanModule,
          },
        ],
      },
    ]),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
