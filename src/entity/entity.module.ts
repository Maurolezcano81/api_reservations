import { Module } from '@nestjs/common';
import { EntityService } from './entity.service';
import { EntityController } from './entity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { People } from './entities/entity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([People])],
  controllers: [EntityController],
  providers: [EntityService],
})
export class EntityModule { }
