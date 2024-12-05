import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { People } from 'src/entity/entities/entity.entity';
import { UpdateEntityDto } from 'src/entity/dto/update-entity.dto';
import { HashService } from 'src/auth/hash/hash.service';

import { RegisterUserDto } from 'src/auth/dto/register-user-auth.dto';
import { RegisterEntityDto } from 'src/auth/dto/register-people-auth';
@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    
  ) { }


  async createUserWithEntity(registerUserDto: RegisterUserDto, registerEntityDto: RegisterEntityDto) {

    const manager = this.userRepository.manager;
    const queryRunner = manager.connection.createQueryRunner();

    await queryRunner.startTransaction();

    try {
      const createUser = await queryRunner.manager.save(User, registerUserDto);

      const createEntity = await queryRunner.manager.save(People, {
        ...registerEntityDto,
        user_fk: createUser
      });

      await queryRunner.commitTransaction();
      return createEntity;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async checkExists(field: string, value: string): Promise<boolean> {
    const data = await this.userRepository.findOne({
      where: { [field]: value }
    });
  
    if (data && typeof data === 'object' && Object.keys(data).length > 0) {
      return true;
    }
  
    return false;
  }

  create(createUserDto: CreateUserDto) {

    const createUserRepo = this.userRepository.create(createUserDto)

    const createUser = this.userRepository.save(createUserRepo)

    return createUser
  }

  async findAll() {

    const [data, total] = await this.userRepository.findAndCount()

    return {
      data,
      total,
      message: "Obtenido exitosamente"
    }
  }

  async findOne(id: number) {

    const data = await this.userRepository.findOne(

      {
        where: { id_user: id }
      }

    )

    return data;
  }

  async updateUserAndEntity(id: number, updateUserDto: UpdateUserDto, updateEntityDto: UpdateEntityDto) {

    const manager = this.userRepository.manager;

    const queryRunner = manager.connection.createQueryRunner();

    await queryRunner.startTransaction()

    try {

      const user = await queryRunner.manager.findOne(User, {
        where: { id_user: id }
      })

      if (!user) {
        throw new Error("No se pudo modificar la informacion, debido a que no existe")
      };


      const entity = await queryRunner.manager.findOne(People, {
        where: { user_fk: { id_user: user.id_user } },
      });


      const { user_fk, ...entityData } = updateEntityDto;

      queryRunner.manager.merge(User, user, updateUserDto);
      queryRunner.manager.merge(People, entity, entityData)

      await queryRunner.manager.save(User, user);
      await queryRunner.manager.save(People, entity);

      await queryRunner.commitTransaction();

      return `User #${id} and associated entity updated successfully.`;

    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();

    }

  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id_user: id } });

    if (!user) {
      throw new Error('Usuario no encontrado.');
    }
    await this.userRepository.remove(user);

    return `Usuario #${id} y los datos de la Persona han sido eliminados satisfactoriamente.`;
  }
}
