import { PartialType } from '@nestjs/mapped-types';
import { CreateEntityDto } from './create-entity.dto';
import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';

export class UpdateEntityDto extends PartialType(CreateEntityDto) {

    @IsNotEmpty()
    @IsString()
    name_entity?: string

    @IsNotEmpty()
    @IsString()
    lastname_entity?: string

    @IsNotEmpty()
    @IsPhoneNumber()
    number_entity?: string

    @IsNotEmpty()
    @IsEmail()
    email_entity?: string

}
