import PostgreSQL from '../connections/postgres';
import ObjectHandler from '../helpers/objectHandler';
import { IMovie, IMovieProperties } from '../interfaces/movie';

export default class MovieModel implements IMovie {
    id!: number;
    title!: string;
    description!: string;
    username!: string;
    likes!: number;
    hates!: number;
    created_at!: number;

    constructor(movie: IMovieProperties = {}) {
        this._setProperties(movie);
    }

    private _setProperties(movie: IMovieProperties = {}): void {
        this.setId(movie.id ? movie.id : 0);
        this.setTitle(movie.title ? movie.title : '');
        this.setDescription(movie.description ? movie.description : '');
        this.setUsername(movie.username ? movie.username : '');
        this.setLikes(movie.likes ? movie.likes : 0);
        this.setHates(movie.hates ? movie.hates : 0);
        this.setCreatedAtStamp(movie.created_at ? movie.created_at : 0);
    }

    getId(): number {
        return this.id;
    }
    getTitle(): string {
        return this.title;
    }
    getDescription(): string {
        return this.description;
    }
    getUsername(): string {
        return this.username;
    }
    getLikes(): number {
        return this.likes;
    }
    getHates(): number {
        return this.hates;
    }
    getCreatedAtStamp(): number {
        return this.created_at;
    }

    setId(id: number): void {
        this.id = Number(id);
    }
    setTitle(t: string): void {
        this.title = t;
    }
    setDescription(d: string): void {
        this.description = d;
    }
    setUsername(u: string): void {
        this.username = u;
    }
    setLikes(l: number): void {
        this.likes = Number(l);
    }
    setHates(h: number): void {
        this.hates = Number(h);
    }
    setCreatedAtStamp(ca: number): void {
        this.created_at = Number(ca);
    }


}