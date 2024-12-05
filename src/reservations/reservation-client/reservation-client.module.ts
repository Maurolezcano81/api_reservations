import { Module } from '@nestjs/common';
import { ReservationClientService } from './reservation-client.service';
import { ReservationClientController } from './reservation-client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationClient } from './entities/reservation-client.entity';
import { TypeReservation } from 'src/admin/type_reservation/entities/type_reservation.entity';
import { Service } from 'src/sale_of_point/services/entities/service.entity';
import { People } from 'src/entity/entities/entity.entity';
import { HoursAttention } from 'src/itinerate/hours-attention/entities/hours-attention.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationClient, HoursAttention, TypeReservation, Service, People])],
  controllers: [ReservationClientController],
  providers: [ReservationClientService],
})
export class ReservationClientModule { }
