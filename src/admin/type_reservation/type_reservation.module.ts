import { Module } from '@nestjs/common';
import { TypeReservationService } from './type_reservation.service';
import { TypeReservationController } from './type_reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeReservation } from './entities/type_reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeReservation])],
  controllers: [TypeReservationController],
  providers: [TypeReservationService],
})
export class TypeReservationModule { }
