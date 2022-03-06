export interface IMovieProperties {
    id?: number;
    title?: string;
    description?: string;
    username?: string;
    likes?: number;
    hates?: number;
    created_at?: number;
}

export type IListOfMovies = Array<IMovieProperties>;
