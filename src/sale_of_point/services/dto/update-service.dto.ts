import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service.dto';
import { IsBoolean, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {


    @IsString({ message: "El nombre del servicio deben ser caracteres validos" })
    name_service?: string

    @IsNumber()
    @Min(1, { message: "El precio debe ser mayor a 0" })
    price_service?: number

    @IsNumber()
    @Min(1, { message: "El tiempo estimado debe ser mayor a 0" })
    estimated_time_service?: number

    status?: boolean

}
