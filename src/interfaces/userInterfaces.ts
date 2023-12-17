export interface IUser {
    id?: number;
    username: string;
    password: string;
}

export interface IProfile {
    id?: number,
    userid: number
    firstName: string | null
    lastName: string | null
    address: string | null
    image: string | null
}

export interface IUserExtended extends IUser {
    profile?: IProfile | null;
}

export interface IUserDb {
    id: number;
    username: string;
    password: string;
}

export interface IProfileDb {
    id: number;
    userid: number;
    first_name: string | null;
    last_name: string | null;
    address: string | null;
    image: string | null;
}

export interface IUserDbExtended extends IUserDb {
    profile?: IProfileDb | null;
}