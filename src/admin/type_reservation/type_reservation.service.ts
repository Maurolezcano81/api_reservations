import { Injectable } from '@nestjs/common';
import { CreateTypeReservationDto } from './dto/create-type_reservation.dto';
import { UpdateTypeReservationDto } from './dto/update-type_reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeReservation } from './entities/type_reservation.entity';
import { Repository } from 'typeorm';


@Injectable()
export class TypeReservationService {
  constructor(
    @InjectRepository(TypeReservation)
    private readonly typeReservationRepository: Repository<TypeReservation>,
  ) { }

  async create(createTypeReservationDto: CreateTypeReservationDto) {

    const createInstanceRepository = this.typeReservationRepository.create(createTypeReservationDto)


    const create = await this.typeReservationRepository.save(createInstanceRepository);
    return create;
  }
  async findAll() {
    const [data, total] = await this.typeReservationRepository.findAndCount();

    return {
      message: 'Tipos de reserva encontrados',
      data,
      total,
    };
  }

  async findOne(id: number) {

    let data = await this.typeReservationRepository.findOneBy({
      id_tr: id
    })

    return data
  }

  async update(id: number, updateTypeReservationDto: UpdateTypeReservationDto) {

    const update = await this.typeReservationRepository.update({
      id_tr: id
    }, updateTypeReservationDto)


    return update;
  }

  async remove(id: number) {

    const remove = await this.typeReservationRepository.delete({
      id_tr: id
    })

    return remove;
  }
}
