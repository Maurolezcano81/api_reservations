import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpException, HttpStatus } from '@nestjs/common';
import { TypeReservationService } from './type_reservation.service';
import { CreateTypeReservationDto } from './dto/create-type_reservation.dto';
import { UpdateTypeReservationDto } from './dto/update-type_reservation.dto';

@Controller('type_reservation')
export class TypeReservationController {
  constructor(private readonly typeReservationService: TypeReservationService) { }

  @Post('/create')
  async create(@Body() createTypeReservationDto: CreateTypeReservationDto) {

    console.log(createTypeReservationDto);
    const create = await this.typeReservationService.create(createTypeReservationDto)

    if (!create) {
      throw new HttpException('Error al crear el tipo de estado de la reserva', HttpStatus.BAD_REQUEST)
    }

    return {
      message: "Tipo de Estado de Reserva creado exitosamente",
      data: create,
    };
  }

  @Get()
  async findAll() {

    const data = await this.typeReservationService.findAll()

    return data;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeReservationService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTypeReservationDto: UpdateTypeReservationDto) {

    const trExists = await this.typeReservationService.findOne(+id);

    if (Object.keys(trExists).length < 1 || trExists === null) {
      throw new HttpException("Ha ocurrido un error al actualizar el tipo de estado de reserva", HttpStatus.BAD_REQUEST)
    }

    const update = await this.typeReservationService.update(+id, updateTypeReservationDto)

    return update;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeReservationService.remove(+id);
  }
}
