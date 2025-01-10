import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { Balance } from './balance.entity';
import { CreateBalanceRequestDto } from './dtos/requests/create-balance-request.dto';
import { UpdateBalanceRequestDto } from './dtos/requests/update-balance-request.dto';
import { CreateBalanceResponseDto } from './dtos/responses/create-balance-response.dto';
import { FindBalanceResponseDto } from './dtos/responses/find-balance-response.dto';

@Injectable()
export class BalancesMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      // Entity to Entity
      createMap(
        mapper,
        Balance,
        Balance,
        forMember(
          (destination) => destination.balance,
          mapFrom((source) => {
            console.log('source: ', source);
            const x = source.balance ? source.balance : undefined;
            console.log('x: ', x);
            return x;
          }),
        ),
      );

      // Dto to Entity
      createMap(mapper, CreateBalanceRequestDto, Balance);
      createMap(mapper, UpdateBalanceRequestDto, Balance);

      // Entity to Dto
      createMap(mapper, Balance, CreateBalanceResponseDto);

      createMap(
        mapper,
        Balance,
        FindBalanceResponseDto,
        forMember(
          (destination) => destination.data.balance,
          mapFrom((source) => source.balance),
        ),
        forMember(
          (destination) => destination.data.id,
          mapFrom((source) => source.id),
        ),
      );
    };
  }
}
