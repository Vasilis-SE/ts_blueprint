import PostgreSQL from '../connections/postgres';
import ObjectHandler from '../helpers/objectHandler';
import { IListOfMovies, IMovie, IMovieFilters, IMovieProperties } from '../interfaces/movie';

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

    async reportMoviesCount(filters: IMovieFilters = {}): Promise<number | boolean> {
        try {
            const resource = ObjectHandler.getResource(this);
            const wherePart = filters.where && filters.where != '' 
                ? filters.where
                : ObjectHandler.objectToSQLParams(resource, ' AND ');

            const queryString = `SELECT COUNT(id) FROM movies
                ${wherePart ? `WHERE ${wherePart}` : ''}
                ${'orderby' in filters ? `ORDER BY ${filters.orderby}` : ''}`;

            const query = await PostgreSQL.client.query(queryString);
            if (query.rowCount === 0) throw Error();
            return Number(query.rows[0].count);
        } catch (error) {
            return false;
        }
    }


    async getMovies(filters: IMovieFilters = {}): Promise<IListOfMovies | boolean> { 
        try {
            let results: IListOfMovies = [];
            const resource = ObjectHandler.getResource(this);
            const wherePart = filters.where && filters.where != '' 
                ? filters.where
                : ObjectHandler.objectToSQLParams(resource, ' AND ');
        
            const query = await PostgreSQL.client.query(`SELECT 
                ${filters.fields ? filters.fields.join(', ') : '*'}
                FROM movies 
                ${wherePart ? `WHERE ${wherePart}` : ''}
                ${'orderby' in filters ? `ORDER BY ${filters.orderby}` : ''}
                ${'limit' in filters ? `LIMIT ${filters.limit}` : ''}`);
            if (query.rowCount === 0) throw Error();

            results = query.rows;
            return results;
        } catch (error) {
            return false;
        }
    }

    async createMovie(): Promise<boolean> {
        try {
            const queryString = `INSERT INTO movies 
                (title, description, username, created_at) VALUES 
                ($1, $2, $3, $4)
                RETURNING id, likes, hates`;
            
            const query = await PostgreSQL.client.query(queryString, [this.getTitle(), 
                this.getDescription(), this.getUsername(), this.getCreatedAtStamp()]);
            if (query.rowCount === 0) throw Error();

            // Set the newly created id
            this.setId(query.rows[0].id);
            return true;
        } catch (error) {
            return false;
        }
    }

    async changeLike(toIncr:boolean): Promise<boolean> {
        try {
            const query = await PostgreSQL.client.query(`UPDATE movies 
                SET likes = ${toIncr ? 'likes + 1' : 'likes - 1'} 
                WHERE id = ${this.getId()}
                RETURNING likes`);
            if (query.rowCount === 0) throw Error();

            // Set the newly created id
            this.setLikes(query.rows[0].likes);
            return true;
        } catch (error) {
            return false;
        }
    }

    async changeHate(toIncr:boolean): Promise<boolean> {
        try {
            const query = await PostgreSQL.client.query(`UPDATE movies 
                SET hates = ${toIncr ? 'hates + 1' : 'hates - 1'} 
                WHERE id = ${this.getId()}
                RETURNING hates`);
            if (query.rowCount === 0) throw Error();

            // Set the newly created id
            this.setHates(query.rows[0].hates);
            return true;
        } catch (error) {
            return false;
        }
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
        this.description = d.replace(/'/g, "\\'");
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