import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    movieid: number

    @Column()
    userid: number

    @Column()
    rating: boolean
}