import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { LoggerMiddleware } from 'src/logger/logger.middleware';
import { MoviesController } from './movies.controller';
import { moviesProviders } from './movies.providers';
import { MoviesService } from './movies.service';

@Module({
    imports: [DatabaseModule],
    controllers: [MoviesController],
    providers: [MoviesService, ...moviesProviders,]
})
export class MoviesModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes('movies')
    }
}

