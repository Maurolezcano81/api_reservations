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

    const instance = this.branchRepository.create(createBranchDto)

    const create = this.branchRepository.save(createBranchDto);

    return create
  }

  async findAll() {

    
    
    return `This action returns all branch`;
  }

  findOne(id: number) {
    return `This action returns a #${id} branch`;
  }

  update(id: number, updateBranchDto: UpdateBranchDto) {
    return `This action updates a #${id} branch`;
  }

  remove(id: number) {
    return `This action removes a #${id} branch`;
  }
}
