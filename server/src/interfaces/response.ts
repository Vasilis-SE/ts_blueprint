import IException from './exceptions';

export interface ISuccessfulResponseData {
    [key: string]: any;
}

export interface ISuccessfulResponse {
    status: boolean;
    httpCode: number;
    data?: ISuccessfulResponseData;
}

export type IFailedResponse = IException;