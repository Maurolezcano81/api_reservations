import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthService {

  private readonly secretKey = process.env.JSON_SECRET

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  async findOne(username_user: string) {

    const data = await this.userRepository.findOne({
      where: { username_user: username_user }
    })


    return data
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }


  generateToken(payload: any): string {
    return jwt.sign(payload, this.secretKey, { expiresIn: '1h' })
  }


  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.secretKey)
    } catch (error) {
      throw new Error("Credenciales de Sesión Invalidos")
    }
  }
}
