import { IsNotEmpty, IsString, Min, MinLength } from "class-validator";

export class CreateTypeReservationDto {
    @IsString({ message: "El nombre debe ser valido" })
    @MinLength(1, { message: "El campo no debe estar vacío" })
    @IsNotEmpty()
    name_tr: string;

}
