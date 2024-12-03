import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Post('/create')
  async create(@Body() createRoleDto: CreateRoleDto) {

    const checkExists = await this.roleService.findByName(createRoleDto.name_role)

    if (checkExists ) {
      throw new BadRequestException("Este rol ya existe, ingrese uno distinto.")
    }


    return this.roleService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {

    const checkExists = await this.roleService.findByName(updateRoleDto.name_role)

    if (checkExists) {
      throw new BadRequestException("Este rol ya existe, ingrese uno distinto.")
    }

    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
