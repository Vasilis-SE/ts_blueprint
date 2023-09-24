export interface IUserProperties {
    id?: number;
    username?: string;
    password?: string;
    created_at?: number;
}

export interface IUser extends IUserProperties {
    getId(): number;
    getUsername(): string;
    getPassword(): string;
    getCreatedAtStamp(): number;

    setId(id?: number): void;
    setUsername(usr?: string): void;
    setPassword(pass?: string): void;
    setCreatedAtStamp(ca?: number): void;
}

export enum UserGlobals {
    USERNAME_MAXLENGTH = 30,
    PASSWORD_MINLENGTH = 6,
    QUERY_LENGTH = 10
}

export type IListOfUsers = Array<IUserProperties>;

export interface IUserTokenContent {
    id: number;
}
