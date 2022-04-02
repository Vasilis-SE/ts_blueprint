import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    movieid: number

    @Column()
    title: string

    @Column()
    description: string
}