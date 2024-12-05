import { PartialType } from '@nestjs/mapped-types';
import { CreateHoursAttentionDto } from './create-hours-attention.dto';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateHoursAttentionDto extends PartialType(CreateHoursAttentionDto) {

    @IsNotEmpty()
    start_ha: string

    @IsNotEmpty()
    end_ha: string

    @IsBoolean()
    status: boolean

    @IsNumber()
    day_fk?: number

}
