import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateHoursAttentionDto {

    @IsNotEmpty()
    start_ha: string

    @IsNotEmpty()
    end_ha: string

    @IsNumber()
    day_fk?: number

}
