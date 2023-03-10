import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    getAll() : Movie[] {
        return this.moviesService.getAll();
    }

    @Get("search")
    search(@Query('year') searchinhYear: string){
        return `We are searching for a movie made after: ${searchinhYear}`;
    }

    @Get('/:id')
    getOne(@Param('id') movieId: string): Movie {
        return this.moviesService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData){
        return this.moviesService.create(movieData);
    }

    @Delete("/:id")
    remove(@Param('id') movieId: string){
        return this.moviesService.deleteOne(movieId);
    }

    // @Put 모든 것을 업데이트 하여서 patch를 주로 이용

    @Patch('/:id')
    patch(@Param('id') movieId: string, @Body() updateData){
        return this.moviesService.update(movieId, updateData);
    }

}
