import { Entity, Column, ManyToOne } from "typeorm"
import { Movie } from './movie'; 
import { User } from './user';

@Entity()
export class Rate {
    @ManyToOne(() => Movie, (movie) => movie.id, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    movieid: number

    @ManyToOne(() => User, (user) => user.id, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    userid: number

    @Column()
    rating: boolean
}