import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    ConfigModule.forRoot(), // Asegúrate de cargar el archivo .env
    TypeOrmModule.forRoot({
      type: 'mysql', // Base de datos
      host: process.env.DB_HOST,
      port: 3306, // Puerto de MySQL
      username: process.env.DB_USERNAME, // Usuario de la base de datos
      password: process.env.DB_PWD, // Contraseña del usuario
      database: process.env.DB_NAME, // Nombre de la base de datos
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Ubicación de las entidades
      synchronize: true, // Solo para desarrollo: sincroniza las tablas automáticamente
    }),
    
    TypeReservationModule,
    
    UsersModule,
    
    RoleModule,
    
    EntityModule,
    
    AuthModule,
    
    BranchModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
