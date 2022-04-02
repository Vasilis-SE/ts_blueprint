import { Entity, Column, OneToOne } from "typeorm";
import { Movie } from './movie'; 

@Entity()
export class MovieInfo {
    @OneToOne(() => Movie, (movie) => movie.id, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    movieid: number

    @Column()
    title: string

    @Column()
    description: string
}