import { IUserStorage } from "./user";

export interface IGlobalContextProperties {
    isLoggedIn: boolean;
    exp: number;
    user: IUserStorage;
    update: Function;
}