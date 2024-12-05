import { Injectable } from '@nestjs/common';
import { CreateHoursAttentionDto } from './dto/create-hours-attention.dto';
import { UpdateHoursAttentionDto } from './dto/update-hours-attention.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HoursAttention } from './entities/hours-attention.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HoursAttentionService {

  constructor(
    @InjectRepository(HoursAttention)
    private readonly haRepository: Repository<HoursAttention>
  ) {

  }

  create(createHoursAttentionDto: CreateHoursAttentionDto) {

    const instance = this.haRepository.create({
      ...createHoursAttentionDto,
      day_fk: { id_day: createHoursAttentionDto.day_fk }
    })


    const create = this.haRepository.save(instance);

    return create
  }

  // findAll() {
  //   return `This action returns all hoursAttention`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} hoursAttention`;
  // }

  async update(id: number, updateHoursAttentionDto: UpdateHoursAttentionDto) {

    const update = await this.haRepository.update(
      {
        id_ha: id
      }, {
      ...updateHoursAttentionDto,
      day_fk: { id_day: updateHoursAttentionDto.day_fk }
    })

    return update;
  }

  remove(id: number) {

    const deleteHour = this.haRepository.delete({
      id_ha: id
    })

    return {
      deleteHour,
      message: "Eliminado correctamente"
    };
  }
}
