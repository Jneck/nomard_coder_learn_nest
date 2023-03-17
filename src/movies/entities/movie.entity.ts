import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('int')
    year: number;

    @Column('simple-array', { nullable: true })
    genres: string[];
}