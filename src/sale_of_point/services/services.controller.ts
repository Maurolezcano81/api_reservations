import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  async create(@Body() createServiceDto: CreateServiceDto) {
    try {
      const checkExists = await this.servicesService.findOne('name_service', createServiceDto.name_service);

      if (checkExists && typeof checkExists === 'object' && Object.keys(checkExists).length > 0) {
        throw new HttpException(
          'Ya existe este servicio, por favor ingrese otro',
          HttpStatus.FORBIDDEN,
        );
      }

      const create = await this.servicesService.create(createServiceDto);
      return create;
    } catch (error) {
      throw new HttpException(
        error.message || 'Error interno del servidor',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.servicesService.findAll();
    } catch (error) {
      throw new HttpException(
        'Error al obtener los servicios',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const service = await this.servicesService.findOne('id_service', id);
      if (!service) {
        throw new HttpException('Servicio no encontrado', HttpStatus.NOT_FOUND);
      }
      return service;
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al obtener el servicio',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    try {
      const updated = await this.servicesService.update(+id, updateServiceDto);
      return updated;
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al actualizar el servicio',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const deleted = await this.servicesService.remove(+id);
      if (!deleted) {
        throw new HttpException('Servicio no encontrado', HttpStatus.NOT_FOUND);
      }
      return { message: 'Servicio eliminado con éxito' };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al eliminar el servicio',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
