import { IsNotEmpty, IsString } from "class-validator";


export class LoginDto {


    @IsString()
    @IsNotEmpty()
    username_user: string

    @IsString()
    @IsNotEmpty()
    pwd_user: string

    
}