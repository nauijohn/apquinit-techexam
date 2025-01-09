import { Module } from '@nestjs/common';

import { EtherscanModule } from './etherscan/etherscan.module';

@Module({
  imports: [EtherscanModule],
  exports: [EtherscanModule],
})
export class EthereumModule {}
