import { PartialType } from '@nestjs/mapped-types';
import { CreateDayDto } from './create-day.dto';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateDayDto extends PartialType(CreateDayDto) {

    @IsNotEmpty()
    @IsString()
    name_day?: string


    @IsNotEmpty()
    @IsBoolean()
    status?: boolean

}
