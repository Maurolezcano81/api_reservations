import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { People } from 'src/entity/entities/entity.entity';
import { EntityService } from 'src/entity/entity.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, People])],
  controllers: [UsersController],
  providers: [UsersService, EntityService],
})
export class UsersModule {}
