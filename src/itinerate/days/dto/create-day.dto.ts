import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateDayDto {

    @IsNotEmpty()
    @IsString()
    name_day?: string

}
