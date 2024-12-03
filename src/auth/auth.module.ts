import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HashService } from './hash/hash.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityService } from 'src/entity/entity.service';
import { People } from 'src/entity/entities/entity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, People])],
  controllers: [AuthController],
  providers: [AuthService, HashService, UsersService, EntityService],
})
export class AuthModule { }
