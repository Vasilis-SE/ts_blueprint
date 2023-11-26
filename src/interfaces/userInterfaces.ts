import ProfileModel from "@models/profileModel";


export interface IUser {
    id?: number | undefined;
    username: string;
    password: string;
}

export interface IUserExtended extends IUser {
    profile?: ProfileModel | null;
}

export interface IUserDb {
    id: number;
    username: string;
    password: string;
}

export interface IUserDbExtended extends IUserDb {
    profile?: IProfileDb | null;
}

export interface IUserDbSearchCriteria {
    where: Partial<IUserDb>
}

export interface IUserQueryParams {
    id?: number;
    username?: string;
}

export interface IProfile {
    id: number,
    userid: number
    firstName: string
    lastName: string
    address: string
    image?: string | null
}

export interface IProfileDb {
    id: number,
    userid: number
    first_name: string
    last_name: string
    address: string
    image?: string | null
}