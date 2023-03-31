import { ApiProperty } from '@nestjs/swagger';
import { isArray, IsNumber, IsOptional, IsString } from 'class-validator'
import Joi from 'joi';

// export const createMovieSchema = Joi.object({
//     title: Joi.string().required(),
//     year: Joi.number().required(),
//     genres: Joi.array(),
// })

export class CreateMovieDto {
    @ApiProperty()
    @IsString()
    readonly title: string;

    @ApiProperty()
    @IsNumber()
    readonly year: number;

    @ApiProperty({ isArray: true })
    @IsOptional()
    @IsString({ each: true })
    readonly genres: string[];
}

