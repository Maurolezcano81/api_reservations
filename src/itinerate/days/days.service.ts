import { Injectable } from '@nestjs/common';
import { CreateDayDto } from './dto/create-day.dto';
import { UpdateDayDto } from './dto/update-day.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Day } from './entities/day.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DaysService {


  constructor(
    @InjectRepository(Day)
    private readonly dayRepository: Repository<Day>
  ) { }


  create(createDayDto: CreateDayDto) {

    const instanceDay = this.dayRepository.create(createDayDto);

    const create = this.dayRepository.save(instanceDay)

    return create;
  }

  async findAll() {

    const [data, total] = await this.dayRepository.findAndCount()

    return data;
  }

  async findOne(name_day: string) {

    const data = await this.dayRepository.findOne({
      where: {
        name_day: name_day
      }
    })

    return data;
  }

  update(id: number, updateDayDto: UpdateDayDto) {
    return this.dayRepository.update({
      id_day: id
    }, updateDayDto);
  }

  remove(id: number) {
    const deleteDay = this.dayRepository.delete(id)
    return deleteDay;
  }
}
