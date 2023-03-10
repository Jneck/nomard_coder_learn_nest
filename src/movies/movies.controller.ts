import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('movies')
export class MoviesController {

    @Get()
    getAll(){
        return "This will return all movies";
    }

    @Get("search")
    search(@Query('year') searchinhYear: string){
        return `We are searching for a movie made after: ${searchinhYear}`;
    }

    @Get('/:id')
    getOne(@Param('id') movieId: string) {
        return `This will return one movie with the id: ${movieId}`;
    }

    @Post()
    create(@Body() movieData){
        return movieData;
    }

    @Delete("/:id")
    remove(@Param('id') movieId: string){
        return "This will delete a movie with the id: ${movieId}";
    }

    // @Put 모든 것을 업데이트 하여서 patch를 주로 이용

    @Patch('/:id')
    patch(@Param('id') movieId: string, @Body() updateData){
        return {
            updateMovie: movieId,
            ...updateData,
        };
    }

}
