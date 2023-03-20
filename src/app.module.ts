import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { HttpExceptionFilter } from './http-exception/http-exception.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [MoviesModule, DatabaseModule],
  controllers: [AppController],
  providers: [
    // { provide: APP_FILTER,
    // useClass: HttpExceptionFilter,},
  ],
})
export class AppModule { }
