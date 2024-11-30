import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeReservationDto } from './create-type_reservation.dto';
import { IsBoolean, IsDate, IsString, MinLength } from 'class-validator';

export class UpdateTypeReservationDto extends PartialType(CreateTypeReservationDto) {

    @IsString()
    @MinLength(1)
    name_tr?: string;

    @IsBoolean()
    status?: boolean;

}
