import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationClientDto } from './create-reservation-client.dto';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateReservationClientDto extends PartialType(CreateReservationClientDto) {

    @IsNumber()
    tr_fk?: number

}
