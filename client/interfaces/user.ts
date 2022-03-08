export interface IUserRegisterProperties {
    username: string;
    password: string;
}

export interface IUserLoginProperties {
    username: string;
    password: string;
}

export interface IUserStorage {
    username: string;
    password: string;
    created_at: number;
}

export interface IGlobalStateProperties {
    isLoggedIn: boolean;
}

export interface IGlobalStateProvider {
    global: IGlobalStateProperties;
    saveGlobal: Function;
    updateGlobal: Function;
}