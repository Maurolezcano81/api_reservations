import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dto/register-user-auth.dto';
import { RegisterEntityDto } from './dto/register-people-auth';
import { HashService } from './hash/hash.service';
import { LoginDto } from './dto/login-auth.dto';
import { FORBIDDEN_MESSAGE } from '@nestjs/core/guards';
import { EntityService } from 'src/entity/entity.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly entityService: EntityService

  ) { }


  @Post('/register')
  async createUserWithEntity(
    @Body('registerUserDto') registerUserDto: RegisterUserDto,
    @Body('registerPeopleDto') registerEntityDto: RegisterEntityDto
  ) {


    const checkExistUsername = await this.usersService.checkExists('username_user', registerUserDto.username_user);

    if (checkExistUsername) {
      throw new HttpException('Nombre de usuario ya existente', HttpStatus.FORBIDDEN)
    }

    const checkExistEmail = await this.entityService.checkExists('email_entity', registerEntityDto.email_entity)

    if (checkExistEmail) {
      throw new HttpException('Este correo ya esta registrado', HttpStatus.FORBIDDEN)
    }

    const checkExistPhone = await this.entityService.checkExists('number_entity', registerEntityDto.number_entity)

    if (checkExistPhone) {
      throw new HttpException('Este numero de telefono ya esta asociada a una cuenta', HttpStatus.FORBIDDEN)
    }

    registerUserDto.pwd_user = await this.hashService.hashPwd(registerUserDto.pwd_user);

    const create = await this.usersService.createUserWithEntity(registerUserDto, registerEntityDto);

    return create
  }

  @Post('/login')
  async login(
    @Body() loginDto: LoginDto
  ) {

    const checkExistUsername = await this.authService.findOne(loginDto.username_user);

    console.log(checkExistUsername)

    if (!checkExistUsername) {
      throw new HttpException("Error en las credenciales de inicio de sesión", HttpStatus.FORBIDDEN)
    }

    const comparePwd: boolean = await this.hashService.comparePwd(checkExistUsername.pwd_user, loginDto.pwd_user);

    if (!comparePwd) {
      throw new HttpException("Error en las credenciales de inicio de sesión", HttpStatus.FORBIDDEN)
    }

    const userInfo = {
      ...checkExistUsername
    }

    delete userInfo.id_user;
    delete userInfo.pwd_user;

    const dataToToken: Object = {
      user: {
        ...userInfo
      },
      token: this.authService.generateToken({
        id_user: checkExistUsername.id_user,
        role: checkExistUsername.role_fk
      })
    }

    return dataToToken
  }

}
