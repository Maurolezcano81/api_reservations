import { Module } from '@nestjs/common';
import { EntityService } from './entity.service';
import { EntityController } from './entity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { People } from './entities/entity.entity';
import { ReservationClient } from 'src/reservations/reservation-client/entities/reservation-client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([People, ReservationClient])],
  controllers: [EntityController],
  providers: [EntityService],
})
export class EntityModule { }
