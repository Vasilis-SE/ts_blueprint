import PostgreSQL from '../connections/postgres';
import ObjectHandler from '../helpers/objectHandler';
import { IListOfUsers, IUser, IUserFilters, IUserProperties } from '../interfaces/user';

export default class UserModel implements IUser {
    constructor(user: IUserProperties = {}) {
        this._setProperties(user);
    }

    private _setProperties(user: IUserProperties = {}): void {
        this.setId(user.id ? user.id : 0);
        this.setUsername(user.username ? user.username : '');
        this.setPassword(user.password ? user.password : '');
        this.setCreatedAtStamp(user.created_at ? user.created_at : 0);
    }

    async getUsers(filters: IUserFilters = {}): Promise<IListOfUsers | boolean> {
        try {
            const wherePart = ObjectHandler.objectToSQLParams(ObjectHandler.getResource(this), ' AND ');
            let results: IListOfUsers = [];

            const query = await PostgreSQL.client.query(`SELECT * FROM users 
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

    getId(): number {
        throw new Error('Method not implemented.');
    }
    getUsername(): string {
        throw new Error('Method not implemented.');
    }
    getPassword(): string {
        throw new Error('Method not implemented.');
    }
    getCreatedAtStamp(): number {
        throw new Error('Method not implemented.');
    }
    setId(id?: number): void {
        throw new Error('Method not implemented.');
    }
    setUsername(usr?: string): void {
        throw new Error('Method not implemented.');
    }
    setPassword(pass?: string): void {
        throw new Error('Method not implemented.');
    }
    setCreatedAtStamp(ca?: number): void {
        throw new Error('Method not implemented.');
    }
}
