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
        this.getOne(id);    // 여기서 없을 경우 자동으로 예외처리 해줌
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
