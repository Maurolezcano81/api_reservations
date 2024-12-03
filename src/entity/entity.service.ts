import { Injectable } from '@nestjs/common';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
import { People } from './entities/entity.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EntityService {

  constructor(
    @InjectRepository(People)
    private readonly entityRepository: Repository<People>,
  ) { }

  async create(createEntityDto: CreateEntityDto) {
    const instanceRepo = this.entityRepository.create({
      ...createEntityDto,
      user_fk: { id_user: createEntityDto.user_fk },
    });

    const create = await this.entityRepository.save(instanceRepo);

    return create;
  }

  async findAll() {
    const [data, total] = await this.entityRepository.findAndCount()


    return {
      data: data,
      message: "Obtenido correctament",
      total: total
    };
  }

  async checkExists(field: string, value: string): Promise<boolean> {

    const data = await this.entityRepository.findOne({
      where: { [field]: value }
    })

    if (data && typeof data === "object" && Object.keys(data).length > 0) {
      return true
    }

    return false
  }

  async findOne(id: number) {
    const data = await this.entityRepository.findOne({
      where: {
        id_entity: id
      }
    })

    return data
  }

  update(id: number, updateEntityDto: UpdateEntityDto) {

    // const update = this.entityRepository.update({
    //   id_entity: id
    // }, updateEntityDto)

    return id;
  }

  remove(id: number) {

    const deleteData = this.entityRepository.delete({
      id_entity: id
    })

    return deleteData;
  }
}
