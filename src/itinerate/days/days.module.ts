import { Module } from '@nestjs/common';
import { DaysService } from './days.service';
import { DaysController } from './days.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Day } from './entities/day.entity';
import { HoursAttention } from '../hours-attention/entities/hours-attention.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Day, HoursAttention])],
  controllers: [DaysController],
  providers: [DaysService],
})
export class DaysModule { }
