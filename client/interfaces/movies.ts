export interface IMovieProperties {
    id?: number;
    title?: string;
    description?: string;
    username?: string;
    likes?: number;
    hates?: number;
    created_at?: number;
}

export enum MovieGlobals {
    TITLE_MAXLENGTH = 40,
    QUERY_LENGTH = 10,
    QUERY_ORDER_FIELD = 'id',
    QUERY_SORT_METHOD = 'ASC',
}

export type IListOfMovies = Array<IMovieProperties>;
