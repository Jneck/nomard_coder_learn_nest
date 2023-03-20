import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    constructor(
        @Inject('MOVIES_REPOSITORY')
        private moviesRepository: Repository<Movie>
    ) { }

    async getAll(): Promise<Movie[]> {
        return this.moviesRepository.find();
    }

    async getOne(id: number): Promise<Movie[]> {
        const movie = this.moviesRepository.findBy({
            id: id
        });
        if (!movie) {
            throw new NotFoundException(`Movie with ID ${id} not found.`);
        }
        return movie;
    }

    async deleteOne(id: number) {
        // id를따오는 함수를
        const movie = await this.moviesRepository.findBy({
            id: id
        });
        // movie를 가지고 하는 함수

        const deleteResult = this.moviesRepository.delete(id);
    }

    async create(movieData: CreateMovieDto) {
        this.moviesRepository.insert({
            ...movieData
        })
    }

    async update(id: number, updateData: UpdateMovieDto) {
        this.getOne(id);
        const movie = this.moviesRepository.update({ id: id }, { ...updateData });
    }

}
