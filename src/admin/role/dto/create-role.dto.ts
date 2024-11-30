import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateRoleDto {

    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    name_role: string

}
