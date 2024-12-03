import { IsEmail, isEmpty, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, ValidateNested } from "class-validator";

export class RegisterEntityDto {

    @IsNotEmpty()
    name_entity: string;
    @IsNotEmpty()
    lastname_entity: string;

    
    @IsNotEmpty()
    @IsPhoneNumber()
    number_entity: string;


    @IsNotEmpty()
    @IsEmail()
    email_entity: string;
    
    
    user_fk?: number;

  }