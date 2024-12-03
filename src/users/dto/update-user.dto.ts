import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNumber, IsString, IsStrongPassword, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsString()
    @MinLength(5)
    username_user?: string

    @IsStrongPassword()
    pwd_user?: string

    @IsNumber()
    role_fk?: {id_role: number}
}
