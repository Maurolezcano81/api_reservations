import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';

@Injectable()


export class ServicesService {

  constructor(
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>
  ) { }

  create(createServiceDto: CreateServiceDto) {

    const instance = this.servicesRepository.create(createServiceDto);

    const create = this.servicesRepository.save(instance);

    return create
  }

  async findAll() {

    const [data, total] = await this.servicesRepository.findAndCount();

    return {
      data,
      total
    }
  }

  async findOne(field: string, value: string) {

    const data = await this.servicesRepository.findBy({
      [field]: value
    })

    return data
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    const update = this.servicesRepository.update({
      id_service: id
    }, updateServiceDto)

    return update
  }

  remove(id: number) {

    const remove = this.servicesRepository.delete({
      id_service: id
    })

    return remove

  }
}
