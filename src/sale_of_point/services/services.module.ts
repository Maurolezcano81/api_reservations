import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { ReservationClient } from 'src/reservations/reservation-client/entities/reservation-client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service, ReservationClient])],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule { }
