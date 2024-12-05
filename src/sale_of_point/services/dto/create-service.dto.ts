import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator"

export class CreateServiceDto {

    @IsNotEmpty({ message: "Debes completar todos los campos" })
    @IsString({ message: "El nombre del servicio deben ser caracteres validos" })
    name_service: string

    @IsNotEmpty({ message: "Debes completar todos los campos" })
    @IsNumber()
    @Min(1, { message: "El precio debe ser mayor a 0" })
    price_service: number

    @IsNotEmpty({ message: "Debes completar todos los campos" })
    @IsNumber()
    @Min(1, { message: "El tiempo estimado debe ser mayor a 0" })
    estimated_time_service: number

}
