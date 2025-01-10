import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Balance } from './balance.entity';
import { BalancesController } from './balances.controller';
import { BalancesMapperProfile } from './balances.mapper.profile';
import { BalancesRepository } from './balances.repository';
import { BalancesService } from './balances.service';

@Module({
  imports: [TypeOrmModule.forFeature([Balance])],
  controllers: [BalancesController],
  providers: [BalancesService, BalancesRepository, BalancesMapperProfile],
})
export class BalancesModule {}
