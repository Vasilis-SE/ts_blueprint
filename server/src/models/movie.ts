import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from './user';

@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.id, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    userid: number

    @Column()
    created_at: number
}