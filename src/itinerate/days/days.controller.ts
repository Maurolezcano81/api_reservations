import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { DaysService } from './days.service';
import { CreateDayDto } from './dto/create-day.dto';
import { UpdateDayDto } from './dto/update-day.dto';

@Controller('days')
export class DaysController {
  constructor(private readonly daysService: DaysService) { }

  @Post()
  async create(@Body() createDayDto: CreateDayDto) {

    const checkExists = await this.daysService.findOne(createDayDto.name_day);


    if (checkExists && Object.keys(checkExists).length > 0) {
      return new HttpException('Este dia ya esta registrado, ingrese otro. Y si es un motivo especial, ingreselo con más detalle', HttpStatus.FORBIDDEN)
    }

    return this.daysService.create(createDayDto);

  }

  @Get()
  findAll() {
    return this.daysService.findAll();
  }

  @Get(':name_day')
  findOne(@Param('name_day') name_day: string) {
    return this.daysService.findOne(name_day);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDayDto: UpdateDayDto) {
    return this.daysService.update(+id, updateDayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.daysService.remove(+id);
  }
}
