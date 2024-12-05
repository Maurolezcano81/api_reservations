import { Module } from '@nestjs/common';
import { TypeReservationService } from './type_reservation.service';
import { TypeReservationController } from './type_reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeReservation } from './entities/type_reservation.entity';
import { ReservationClient } from 'src/reservations/reservation-client/entities/reservation-client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeReservation, ReservationClient])],
  controllers: [TypeReservationController],
  providers: [TypeReservationService],
})
export class TypeReservationModule { }
