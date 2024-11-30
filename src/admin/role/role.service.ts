import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {

  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {
  }

  create(createRoleDto: CreateRoleDto) {

    const initRepository = this.roleRepository.create(createRoleDto)

    const create = this.roleRepository.save(initRepository)

    return create;
  }

  async findAll() {

    const [data, total] = await this.roleRepository.findAndCount()

    return {
      message: "Obtenido correctament",
      data,
      total
    };
  }

  async findOne(id: number) {

    const data = await this.roleRepository.findBy({ id_role: id })

    return data
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {


    const update = this.roleRepository.update({
      id_role: id
    }, updateRoleDto)


    return (update)
  }



  remove(id: number) {

    const deleteRole = this.roleRepository.delete({
      id_role: id
    })

    return deleteRole
  }
}
