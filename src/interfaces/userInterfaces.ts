export interface IUser {
    id?: number | undefined;
    username: string;
    password: string;
}

export interface IUserDb {
    id: number;
    username: string;
    password: string;
}

export interface IUserQueryParams {
    id?: number;
    username?: string;
}