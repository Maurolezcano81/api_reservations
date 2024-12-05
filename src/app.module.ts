import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeReservationModule } from './admin/type_reservation/type_reservation.module';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importa ConfigModule y ConfigService
import { UsersModule } from './users/users.module';
import { RoleModule } from './admin/role/role.module';
import { EntityModule } from './entity/entity.module';
import { AuthModule } from './auth/auth.module';
import { BranchModule } from './sale_of_point/branch/branch.module';
import { DaysModule } from './itinerate/days/days.module';
import { HoursAttentionModule } from './itinerate/hours-attention/hours-attention.module';
import { ServicesModule } from './sale_of_point/services/services.module';
import { ReservationClientModule } from './reservations/reservation-client/reservation-client.module';
import { AuthMiddleware } from './auth/auth/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PWD, 
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, 
    }),
    
    TypeReservationModule,
    
    UsersModule,
    
    RoleModule,
    
    EntityModule,
    
    AuthModule,
    
    BranchModule,
    
    DaysModule,
    
    HoursAttentionModule,
    
    ServicesModule,
    
    ReservationClientModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    .exclude(
      {path: 'auth/login', method: RequestMethod.POST},
      {path: 'auth/register', method: RequestMethod.POST},
    )
    .forRoutes('*'); 
  }
}
