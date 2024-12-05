import { Injectable } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BranchService {

  constructor(
    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>
  ) { }

  create(createBranchDto: CreateBranchDto) {

    const instance = this.branchRepository.create({
      ...createBranchDto,
      supervisor: { id_user: createBranchDto.supervisor }
    })

    const create = this.branchRepository.save(instance);

    return create
  }

  async findAll() {

    const [data] = await this.branchRepository.findAndCount();


    return {
      data: data[0]
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} branch`;
  }

  async update(id: number, updateBranchDto: UpdateBranchDto) {

    const updateInstance = await this.branchRepository.update({
      id_branch: id
    }, {
      ...updateBranchDto,
      supervisor: { id_user: updateBranchDto.supervisor }
    })
  }

  remove(id: number) {
    return `This action removes a #${id} branch`;
  }
}
