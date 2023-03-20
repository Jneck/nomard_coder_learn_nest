import { Body, Controller, Delete, ForbiddenException, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, Req, Res, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/http-exception/http-exception.filter';
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

    @Get('/:id')
    getOne(@Param('id') movieId: number): Promise<Movie[]> {
        console.log(typeof movieId);
        return this.moviesService.getOne(movieId);
    }

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

    /*
        learn exception filter
    */
    // 1. standard execption
    @Get('/exception/standard')
    async standardException() {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    // 2. try catch
    @Get('exception/cause/:id')
    async standardCauseException(@Param('id') movieId: number) {
        try {
            this.moviesService.deleteOne(movieId);
        }
        catch (err) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: "This is a custom message",
            }
                , HttpStatus.FORBIDDEN
                , { cause: err });
        }
    }

    // 3. new exception filter
    @Post('/exception/filter')
    @UseFilters(HttpExceptionFilter)
    async createExceptionFilter(@Body() createDto: CreateMovieDto) {
        throw new ForbiddenException;
    }

    /*
        learn pipe
    */
    // 1. PareseIntPipe
    @Get('/pipe/:id')
    async parseIntPipeExample(@Param('id', ParseIntPipe) movieId: number) {
        console.log(typeof movieId);
        return this.moviesService.getOne(movieId);
    }

    // 2. pipe instance -> custom
    @Get('/pipe/instance/:id')
    async parseIntPipeInstance(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) movieId: number) {
        console.log(typeof movieId);
        return this.moviesService.getOne(movieId);
    }

    // 3. 

}
