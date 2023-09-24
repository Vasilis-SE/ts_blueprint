export interface IMovieProperties {
    id?: number;
    title?: string;
    description?: string;
    username?: string;
    likes?: number;
    hates?: number;
    created_at?: number;
}

export interface IMovie extends IMovieProperties {
    getId(): number;
    getTitle(): string;
    getDescription(): string;
    getUsername(): string;
    getLikes(): number;
    getHates(): number;
    getCreatedAtStamp(): number;

    setId(id: number): void;
    setTitle(t: string): void;
    setDescription(d: string): void;
    setUsername(u: string): void;
    setLikes(l: number): void;
    setHates(h: number): void;
    setCreatedAtStamp(ca: number): void;
}

export enum MovieGlobals {
    TITLE_MAXLENGTH = 40,
    QUERY_LENGTH = 10,
    QUERY_ORDER_FIELD = 'id',
    QUERY_SORT_METHOD = 'ASC',
}

export interface IMovieUrlParameters extends IMovieProperties {
    range?: string;
}

export interface IMovieFilters {
    fields?: Array<string>; // Fields are used on queries to fetch specific fields
    orderby?: string; // Order by for the query
    limit?: string; // Limit for the query
    where?: string; // Replacement where clause for the query
}

export type IListOfMovies = Array<IMovieProperties>;
