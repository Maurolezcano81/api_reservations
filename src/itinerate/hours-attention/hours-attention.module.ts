import { Module } from '@nestjs/common';
import { HoursAttentionService } from './hours-attention.service';
import { HoursAttentionController } from './hours-attention.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HoursAttention } from './entities/hours-attention.entity';
import { Day } from '../days/entities/day.entity';
import { ReservationClient } from 'src/reservations/reservation-client/entities/reservation-client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HoursAttention, Day, ReservationClient])],
  controllers: [HoursAttentionController],
  providers: [HoursAttentionService],
})
export class HoursAttentionModule {}
