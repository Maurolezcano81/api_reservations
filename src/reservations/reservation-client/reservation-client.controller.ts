import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ReservationClientService } from './reservation-client.service';
import { CreateReservationClientDto } from './dto/create-reservation-client.dto';
import { UpdateReservationClientDto } from './dto/update-reservation-client.dto';
import { Request } from 'express';

@Controller('reservation-client')
export class ReservationClientController {
  constructor(private readonly reservationClientService: ReservationClientService) { }

  @Post()
  create(@Body() createReservationClientDto: CreateReservationClientDto
    , @Req() req: Request) {

    const client_fk = req["id_user"]


    return this.reservationClientService.create(createReservationClientDto, client_fk);
  }

  @Get()
  findAll() {
    return this.reservationClientService.findAll();
  }

  @Get('/pendings')
  findAllPendings() {
    return this.reservationClientService.findAllPendings();
  }

  @Get('/reservates')
  findAllReservates(@Body('date') date: Date) {
    return this.reservationClientService.findAllReservationsByDay(date);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationClientService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservationClientDto: UpdateReservationClientDto) {
    return this.reservationClientService.update(+id, updateReservationClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationClientService.remove(+id);
  }
}
