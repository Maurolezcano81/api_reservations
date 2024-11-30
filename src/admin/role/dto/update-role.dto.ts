import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    name_role?: string;


    @IsBoolean()
    @IsNotEmpty()
    status?: boolean
}
