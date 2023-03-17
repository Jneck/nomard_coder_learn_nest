import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, Res } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService) { }

    @Get()
    getAll(): Promise<Movie[]> {
        return this.moviesService.getAll();
    }

    // @Get("search")
    // search(@Query('year') searchinYear: number){
    //     return `We are searching for a movie made after: ${searchinYear}`;
    // }

    // @Get('/:id')
    // getOne(@Param('id') movieId: number): Movie {
    //     console.log(typeof movieId);
    //     return this.moviesService.getOne(movieId);
    // }

    @Post()
    create(@Body() movieData: CreateMovieDto) {
        return this.moviesService.create(movieData);
    }

    @Delete("/:id")
    remove(@Param('id') movieId: number) {
        return this.moviesService.deleteOne(movieId);
    }

    // // @Put 모든 것을 업데이트 하여서 patch를 주로 이용

    @Patch('/:id')
    patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
        return this.moviesService.update(movieId, updateData);
    }

}
