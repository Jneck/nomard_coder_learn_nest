import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { MoviesController } from './movies.controller';
import { moviesProviders } from './movies.providers';
import { MoviesService } from './movies.service';

@Module({
    imports: [DatabaseModule],
    controllers: [MoviesController],
    providers: [MoviesService, ...moviesProviders,]
})
export class MoviesModule { }
