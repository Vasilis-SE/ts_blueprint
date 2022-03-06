import { CouldNotCreateNewMovie, MovieAlreadyExists, NoMovies } from "../exceptions/movie";
import { ContainsInvalidChars, ExcessiveBodyProperties, InputExceedMaxLimit, InvalidParameterFormat, InvalidParameterType, InvalidPropertyType, PropertyIsMissing } from "../exceptions/validation";
import { HttpCodes } from "../helpers/httpCodesEnum";
import ObjectHandler from "../helpers/objectHandler";
import Validator from "../helpers/validator";
import { IRequestQueryFilters } from "../interfaces/express";
import { IMovieFilters, IMovieProperties, IMovieUrlParameters, MovieGlobals } from "../interfaces/movie";
import { IFailedResponse, IMetaProperties, ISuccessfulResponse } from "../interfaces/response";
import MovieModel from "../models/movie";

export default class MovieService { 

    async createMovie(payload: IMovieProperties): Promise<ISuccessfulResponse | IFailedResponse> {
        try {
            const validProperties = ['username', 'title', 'description'];
            if (Object.keys(payload).length > validProperties.length) 
                throw new ExcessiveBodyProperties();

            // Check if all data are available
            if (!('title' in payload) || !payload.title) 
                throw new PropertyIsMissing('', 'title');
            if (!('description' in payload) || !payload.description) 
                throw new PropertyIsMissing('', 'description');

            // Check integrity of data
            if(typeof payload.title !== 'string')
                throw new InvalidPropertyType('', 'string', 'title');
            if(typeof payload.description !== 'string')
                throw new InvalidPropertyType('', 'string', 'description');
            if (Validator.hasSpecialCharacters(payload.title, '_ALLEXCDD')) 
                throw new ContainsInvalidChars('', 'title');
            if (Validator.hasSpecialCharacters(payload.description, '_ALLEXCDD')) 
                throw new ContainsInvalidChars('', 'description');

            if (payload.title.length > MovieGlobals.TITLE_MAXLENGTH) 
                throw new InputExceedMaxLimit('', 'title');
  
            const _model = new MovieModel();
            _model.setTitle(payload.title);
            _model.setDescription(payload.description);
           
            // Check if new movie was already created by the specific user.
            if(await _model.getMovies(this._getMovieFilters({limit: 1})))
                throw new MovieAlreadyExists();
               
            _model.setUsername(payload.username);
            _model.setCreatedAtStamp(Math.floor(Date.now() / 1000));
            if(!await _model.createMovie())
                throw new CouldNotCreateNewMovie();

            const response: ISuccessfulResponse = {
                status: true,
                httpCode: HttpCodes.CREATED,
                data: ObjectHandler.getResource(_model),
            };
            return response;
        } catch (e) {
            if(
                !(e instanceof ExcessiveBodyProperties) &&
                !(e instanceof PropertyIsMissing) &&
                !(e instanceof InvalidPropertyType) &&
                !(e instanceof ContainsInvalidChars) &&
                !(e instanceof InputExceedMaxLimit) &&
                !(e instanceof MovieAlreadyExists) &&
                !(e instanceof CouldNotCreateNewMovie)
            ) throw e;

            const errorResource: any = { status: false, ...ObjectHandler.getResource(e) };
            const error: IFailedResponse = errorResource;
            return error;
        }
    }

    async getMovies(params: IMovieUrlParameters, query: IRequestQueryFilters): Promise<ISuccessfulResponse | IFailedResponse> {
        try {
            // Create filters for the query
            const finalFilters: IMovieFilters = await this._getMovieFilters(query);
            if(('range' in params) && params.range != '') {
                if(params.range.indexOf(',') === -1)
                    throw new InvalidParameterFormat('', 'range', '1646492022,1646492028');

                const stampsParts = params.range.split(',');
                finalFilters.where = `created_at BETWEEN ${Number(stampsParts[0].trim())} AND ${Number(stampsParts[1].trim())}`;
                delete params.range;
            } 

            const _model = new MovieModel(params);
            const results = await _model.getMovies(finalFilters);
            if (!results) throw new NoMovies();

            const response: ISuccessfulResponse = {
                status: true,
                httpCode: HttpCodes.OK,
                data: ObjectHandler.getResource(results),
            };
            return response;
        } catch (e) {
            if(!(e instanceof InvalidParameterFormat) && !(e instanceof NoMovies))
                throw e;

            const errorResource: any = { status: false, ...ObjectHandler.getResource(e) };
            const error: IFailedResponse = errorResource;
            return error;
        }
    }

    async getMoviesMeta(baseUrl: string, resultsNum: number, params: IMovieUrlParameters, query: IRequestQueryFilters): Promise<IMetaProperties | boolean> {
        try {
            let _prev: string = "";
            let _next: string = "";
            let queryClonePrev = {...query};
            let queryCloneNext = {...query};

            const _model = new MovieModel(params);
            const moviesCount = await _model.reportMoviesCount();
            if(!moviesCount) return false;

            let page = ('page' in query) && query.page > 0 ? query.page : 0;
            let limit = ('limit' in query) && query.limit > 0 
                ? query.limit
                : MovieGlobals.QUERY_LENGTH;
            const offset = (page * limit) + resultsNum;

            let _pages: number = Math.ceil(Number(moviesCount) / limit);

            if (page) {
                queryClonePrev.page--;
                _prev = `${baseUrl}?${Object.keys(queryClonePrev)
                    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(queryClonePrev[k])}`).join('&')}`
            }

            if(offset < moviesCount) {
                queryCloneNext.page++;
                _next = `${baseUrl}?${Object.keys(queryCloneNext)
                    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(queryCloneNext[k])}`).join('&')}`
            }

            return {_num: Number(moviesCount), _pages, _prev, _next};
        } catch (error) {
            return false;
        }
    }

    /**
     * Protected class function of UserService that is used to clear and gather all the
     * filter data needed. Filters are used for managing queries on database. For example
     * ordering a query, calculating the 'chunk' of data to return for pagination etc.
     * @param filters Object of IRequestQueryFilters interface that contains the filters.
     * @returns Object of IUserFilters interface which contains the final filters a query will use.
     */
    protected _getMovieFilters(filters: IRequestQueryFilters): IMovieFilters {
        const final: IMovieFilters = {};

        // Set order by filter
        final.orderby = `${MovieGlobals.QUERY_ORDER_FIELD} ${MovieGlobals.QUERY_SORT_METHOD}`;
        if ('order' in filters && filters.order && 'sort' in filters && filters.sort)
            final.orderby = `${filters.order} ${filters.sort}`;

        let page = 0;
        if ('page' in filters && filters.page) {
            if (!Validator.isNumber(filters.page.toString())) throw new InvalidParameterType('', 'page', 'number');
            page = Number(filters.page);
        }

        let limit = MovieGlobals.QUERY_LENGTH;
        if ('limit' in filters && filters.limit) {
            if (!Validator.isNumber(filters.limit.toString())) throw new InvalidParameterType('', 'limit', 'number');
            limit = Number(filters.limit);
        }

        const offset = page * limit;
        final.limit = `${limit} OFFSET ${offset}`;

        return final;
    }
}