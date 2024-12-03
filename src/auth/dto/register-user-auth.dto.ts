import { IsNotEmpty, IsNumber, IsString, IsStrongPassword, MinLength } from "class-validator";

export class RegisterUserDto {

    @IsString()
    @MinLength(5)
    username_user: string

    @IsStrongPassword()
    pwd_user: string

    @IsNumber()
    role_fk: {id_role: number}
}
