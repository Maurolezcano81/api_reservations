import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateReservationClientDto {


    @IsNotEmpty({message: "Debes completar todos los campos"})
    @IsNumber()
    client_fk: number

    @IsNotEmpty({message: "Debes completar todos los campos"})
    @IsString({message: "Debe seleccionar un horario de inicio"})
    hour_start: string

    hour_end?: string

    @IsNotEmpty({message: "Debes completar todos los campos"})
    @IsNumber()
    service_fk: number

    @IsNotEmpty({message: "Debes completar todos los campos"})
    @IsNumber()
    tr_fk: number

    @IsNotEmpty({message: "Debes completar todos los campos"})
    reservated_at: Date

}
