import { IsNumber, IsString, IsStrongPassword, MinLength } from "class-validator";
import { PrimaryColumn } from "typeorm";

export class CreateUserDto {


    @IsString()
    @MinLength(5)
    username_user: string

    @IsStrongPassword()
    pwd_user: string

    @IsString()
    role_user: string

    @IsNumber()
    entity_fk: number
}
