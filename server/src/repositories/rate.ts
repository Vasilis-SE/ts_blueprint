import PostgreSQL from "../connections/postgres";
import ObjectHandler from "../helpers/objectHandler";
import { IListOfRattings, IRate, IRateFilters, IRateProperties } from "../interfaces/rate";

export default class RateModel implements IRate {
    username!: string;
    movieid!: number;
    type!: boolean | undefined;

    constructor(ratting: IRateProperties = {}) {
        this._setProperties(ratting);
    }

    private _setProperties(ratting: IRateProperties = {}): void {
        this.setUsername(ratting.username ? ratting.username : '');
        this.setMovieId(ratting.movieid ? ratting.movieid : 0);
        this.setType(ratting.type ? ratting.type : undefined);
    }

    async getRattings(filters: IRateFilters = {}): Promise<IListOfRattings | boolean> { 
        try {
            let results: IListOfRattings = [];
            const resource = ObjectHandler.getResource(this);
            const wherePart = ObjectHandler.objectToSQLParams(resource, ' AND ');
        
            const query = await PostgreSQL.client.query(`SELECT 
                ${filters.fields ? filters.fields.join(', ') : '*'}
                FROM ratings 
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

    async addRating(): Promise<boolean> {
        try {
            const query = await PostgreSQL.client.query(`INSERT INTO ratings (username, movieid, type) 
                VALUES ('${this.getUsername()}', '${this.getMovieId()}', ${this.getType()})`);
            if (query.rowCount === 0) throw Error();
            return true;
        } catch (error) {
            return false;
        }
    }

    async changeRatingType(): Promise<boolean> {
        try {
            const queryString = `UPDATE ratings 
                SET type = ${this.getType()}
                WHERE username = $1 AND movieid = $2`

            const query = await PostgreSQL.client.query(queryString, 
                [this.getUsername(), this.getMovieId()]);
            if (query.rowCount === 0) throw Error();
            return true;
        } catch (error) {
            return false;
        }
    }

    async removeRating(): Promise<boolean> {
        try {
            const query = await PostgreSQL.client.query(`DELETE FROM ratings
                WHERE username = '${this.getUsername()}' AND movieid = ${this.getMovieId()}`);
            if (query.rowCount === 0) throw Error();
            return true;
        } catch (error) {
            return false;
        }
    }

    getUsername(): string {
        return this.username;
    }
    getMovieId(): number {
        return this.movieid;
    }
    getType(): boolean | undefined {
        return this.type;
    }
    setUsername(usr?: string): void {
        this.username = usr;
    }
    setMovieId(mi?: number): void {
        this.movieid = Number(mi);
    }
    setType(t?: boolean | undefined): void {
        this.type = t;
    }
}