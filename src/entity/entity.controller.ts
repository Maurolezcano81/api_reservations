import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { EntityService } from './entity.service';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';

@Controller('entity')
export class EntityController {
  constructor(private readonly entityService: EntityService) { }

  @Post()
  async create(@Body() createEntityDto: CreateEntityDto) {

   

    return this.entityService.create(createEntityDto);
  }

  @Get()
  findAll() {
    return this.entityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entityService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEntityDto: UpdateEntityDto) {

  //   const checkExistEmail = await this.entityService.checkExists({
  //     name_entity: updateEntityDto.email_entity
  //   })

  //   if (checkExistEmail) {
  //     throw new HttpException('Este correo ya esta registrado', HttpStatus.FORBIDDEN)
  //   }

  //   const checkExistPhone = await this.entityService.checkExists({
  //     number_entity: updateEntityDto.number_entity
  //   })

  //   if (checkExistPhone) {
  //     throw new HttpException('Este numero de telefono ya esta asociada a una cuenta', HttpStatus.FORBIDDEN)
  //   }

    return this.entityService.update(+id, updateEntityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entityService.remove(+id);
  }
}
