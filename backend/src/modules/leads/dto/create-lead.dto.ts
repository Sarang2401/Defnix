import { IsString, IsEmail, IsOptional, MinLength } from 'class-validator';

export class CreateLeadDto {
    @IsString()
    @MinLength(1)
    name!: string;

    @IsEmail()
    email!: string;

    @IsString()
    @IsOptional()
    company?: string;

    @IsString()
    @MinLength(10)
    message!: string;

    @IsString()
    @IsOptional()
    source?: string;
}
