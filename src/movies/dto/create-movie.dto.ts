import { IsNumber, IsOptional, IsString } from 'class-validator'
import Joi from 'joi';

// export const createMovieSchema = Joi.object({
//     title: Joi.string().required(),
//     year: Joi.number().required(),
//     genres: Joi.array(),
// })

export class CreateMovieDto {
    @IsString()
    readonly title: string;

    @IsNumber()
    readonly year: number;

    @IsOptional()
    @IsString({ each: true })
    readonly genres: string[];
}

