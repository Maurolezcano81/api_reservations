import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateEntityDto } from 'src/entity/dto/create-entity.dto';
import { UpdateEntityDto } from 'src/entity/dto/update-entity.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string,
    @Body('updateUserDto') updateUserDto: UpdateUserDto,
    @Body('updateEntityDto') updateEntityDto: UpdateEntityDto) {

    console.log(updateUserDto);
    return this.usersService.updateUserAndEntity(+id, updateUserDto, updateEntityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
