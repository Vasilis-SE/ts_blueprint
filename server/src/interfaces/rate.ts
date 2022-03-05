export interface IRateProperties {
    username?: string;
    movieid?: number;
    type?: boolean | undefined;
}

export interface IRate extends IRateProperties {
    getUsername(): string;
    getMovieId(): number;
    getType(): boolean | undefined;

    setUsername(usr?: string): void;
    setMovieId(mi?: number): void;
    setType(t?: boolean | undefined): void;
}

export type IListOfRattings = Array<IRateProperties>;

export enum RateGlobals {
    QUERY_LENGTH = 10,
    QUERY_ORDER_FIELD = 'movieid',
    QUERY_SORT_METHOD = 'ASC',
}

export interface IRateFilters {
    fields?: Array<string>;
    orderby?: string; 
    limit?: string; 
}