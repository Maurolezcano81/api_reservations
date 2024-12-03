import { PartialType } from '@nestjs/mapped-types';
import { CreateBranchDto } from './create-branch.dto';
import { IsEmail, IsHexColor, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUrl } from 'class-validator';

export class UpdateBranchDto extends PartialType(CreateBranchDto) {

    @IsNotEmpty()
    @IsString()
    name_branch?: string

    @IsNotEmpty()
    @IsString()
    login_branch?: string

    @IsNotEmpty()
    @IsString()
    logo_branch?: string


    @IsOptional()
    @IsUrl()
    fb_branch?: string

    @IsOptional()
    @IsUrl()
    ig_branch?: string

    @IsOptional()
    @IsUrl()
    tw_branch?: string


    @IsNotEmpty()
    @IsEmail()
    email_branch?: string

    @IsNotEmpty()
    @IsPhoneNumber()
    tel_branch?: string

    @IsOptional()
    @IsHexColor()
    principal_color?: string

}
