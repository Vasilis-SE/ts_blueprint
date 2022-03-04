import { IUser, IUserProperties } from '../interfaces/user';

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
