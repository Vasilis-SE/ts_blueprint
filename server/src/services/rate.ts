import { NoMovies } from "../exceptions/movie";
import { FailedToRateMovie, UserAlreadyRated } from "../exceptions/rate";
import { ExcessiveBodyProperties, InvalidParameterType, InvalidPropertyType, PropertyIsMissing } from "../exceptions/validation";
import { HttpCodes } from "../helpers/httpCodesEnum";
import ObjectHandler from "../helpers/objectHandler";
import Validator from "../helpers/validator";
import { IRequestQueryFilters } from "../interfaces/express";
import { IRateFilters, IRateProperties, RateGlobals } from "../interfaces/rate";
import { IFailedResponse, ISuccessfulResponse } from "../interfaces/response";
import MovieModel from "../models/movie";
import RateModel from "../models/rate";

export default class RateService {

    async addRating(payload: IRateProperties): Promise<ISuccessfulResponse | IFailedResponse> {
        try {
            const validProperties = ['username', 'movieid', 'type'];
            if (Object.keys(payload).length > validProperties.length) throw new ExcessiveBodyProperties();

            // Check fields integrity
            if (!('movieid' in payload) || !payload.movieid) 
                throw new PropertyIsMissing('', 'movieid');
            if (!('type' in payload) || !payload.type) 
                throw new PropertyIsMissing('', 'type');

            if (typeof payload.movieid !== 'number') 
                throw new InvalidPropertyType('', 'number', 'movieid');
            if (typeof payload.type !== 'boolean') 
                throw new InvalidPropertyType('', 'type', 'boolean');

            // Check if the given movie id exists
            const _movieModel = new MovieModel({id: payload.movieid});
            if(!await _movieModel.getMovies())
                throw new NoMovies();
                
            // Check if user already voted for specific movie
            const _model = new RateModel();
            _model.setUsername(payload.username);
            _model.setMovieId(payload.movieid);

            if(await _model.getRattings(await this._getRateFilters({limit: 1})))
                throw new UserAlreadyRated();

            // Add the ratting into the database table
            _model.setType(payload.type);
            if(!await _model.addRating())
                throw new FailedToRateMovie();

            // Increment likes or hates
            _movieModel.setUsername(payload.username);
            if(payload.type) 
                if(!await _movieModel.likeMovie())
                    throw new FailedToRateMovie();
            else
                if(!await _movieModel.hateMovie())
                    throw new FailedToRateMovie();

            const response: ISuccessfulResponse = {
                status: true,
                httpCode: HttpCodes.CREATED,
                data: ObjectHandler.getResource(_movieModel),
            };
            return response;
        } catch (e) {
            if(
                !(e instanceof ExcessiveBodyProperties) &&
                !(e instanceof PropertyIsMissing) &&
                !(e instanceof InvalidPropertyType) &&
                !(e instanceof NoMovies) &&
                !(e instanceof UserAlreadyRated) &&
                !(e instanceof FailedToRateMovie)
            ) throw e;

            const errorResource: any = { status: false, ...ObjectHandler.getResource(e) };
            const error: IFailedResponse = errorResource;
            return error;
        }
    }

    /**
     * Protected class function of UserService that is used to clear and gather all the
     * filter data needed. Filters are used for managing queries on database. For example
     * ordering a query, calculating the 'chunk' of data to return for pagination etc.
     * @param filters Object of IRequestQueryFilters interface that contains the filters.
     * @returns Object of IUserFilters interface which contains the final filters a query will use.
     */
     protected _getRateFilters(filters: IRequestQueryFilters): IRateFilters {
        const final: IRateFilters = {};

        // Set order by filter
        final.orderby = `${RateGlobals.QUERY_ORDER_FIELD} ${RateGlobals.QUERY_SORT_METHOD}`;
        if ('order' in filters && filters.order && 'sort' in filters && filters.sort)
            final.orderby = `${filters.order} ${filters.sort}`;

        let page = 0;
        if ('page' in filters && filters.page) {
            if (!Validator.isNumber(filters.page.toString())) throw new InvalidParameterType('', 'page', 'number');
            page = Number(filters.page);
        }

        let limit = RateGlobals.QUERY_LENGTH;
        if ('limit' in filters && filters.limit) {
            if (!Validator.isNumber(filters.limit.toString())) throw new InvalidParameterType('', 'limit', 'number');
            limit = Number(filters.limit);
        }

        const offset = page * limit;
        final.limit = `${limit} OFFSET ${offset}`;

        return final;
    }
}
