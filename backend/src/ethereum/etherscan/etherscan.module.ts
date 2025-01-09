import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { EtherscanController } from './etherscan.controller';
import { EtherscanService } from './etherscan.service';

@Module({
  imports: [HttpModule],
  controllers: [EtherscanController],
  providers: [EtherscanService],
})
export class EtherscanModule {}
