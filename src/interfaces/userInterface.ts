export interface IUser {
    id?: number | undefined;
    username: string;
    password: string;
}

export interface IUserDB {
    id: number;
    username: string;
    password: string;
}