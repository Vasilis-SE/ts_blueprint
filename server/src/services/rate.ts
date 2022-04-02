import { NoMovies } from "../exceptions/movie";
import { CannotRateYourOwnMovie, FailedDeletingRating, FailedToRateMovie, InvalidRating, NoRatingFound, UserAlreadyRated } from "../exceptions/rate";
import { ExcessiveBodyProperties, InvalidParameterType, InvalidPropertyType, PropertyIsMissing } from "../exceptions/validation";
import { HttpCodes } from "../helpers/httpCodesEnum";
import ObjectHandler from "../helpers/objectHandler";
import Validator from "../helpers/validator";
import { IRequestQueryFilters } from "../interfaces/express";
import { IMovieProperties } from "../interfaces/movie";
import { IRateFilters, IRateProperties, RateGlobals } from "../interfaces/rate";
import { IFailedResponse, ISuccessfulResponse } from "../interfaces/response";
import { IUserProperties } from "../interfaces/user";
import MovieModel from "../repositories/movie";
import RateModel from "../repositories/rate";

export default class RateService {

    async getRatings(params: IRateProperties): Promise<ISuccessfulResponse | IFailedResponse> {
        try {
            if (('movieid' in params) && typeof params.movieid !== 'number') 
                throw new InvalidPropertyType('', 'number', 'movieid');
            if (('type' in params) && typeof params.type !== 'boolean') 
                throw new InvalidPropertyType('', 'type', 'boolean');
            
            const _model = new RateModel(params);
            const results: any = await _model.getRattings();
            if(!results) throw new NoRatingFound();

            const response: ISuccessfulResponse = {
                status: true,
                httpCode: HttpCodes.CREATED,
                data: results,
            };
            return response;
        } catch (e) {
            if(
                !(e instanceof InvalidPropertyType) &&
                !(e instanceof NoRatingFound) 
            ) throw e;

            const errorResource: any = { status: false, ...ObjectHandler.getResource(e) };
            const error: IFailedResponse = errorResource;
            return error;
        }   
    }

    async addRating(user: IUserProperties, payload: IRateProperties): Promise<ISuccessfulResponse | IFailedResponse> {
        try {
            const validProperties = ['movieid', 'type'];
            if (Object.keys(payload).length > validProperties.length) throw new ExcessiveBodyProperties();

            // Check fields integrity
            if (!('movieid' in payload) || !payload.movieid) 
                throw new PropertyIsMissing('', 'movieid');
            if (!('type' in payload)) 
                throw new PropertyIsMissing('', 'type');

            if (typeof payload.movieid !== 'number') 
                throw new InvalidPropertyType('', 'number', 'movieid');
            if (typeof payload.type !== 'boolean') 
                throw new InvalidPropertyType('', 'type', 'boolean');

            // Check if the given movie id exists
            const _movieModel = new MovieModel({id: payload.movieid});
            let movieDataResults = await _movieModel.getMovies();
            if(!movieDataResults) throw new NoMovies();
            const movieData: IMovieProperties = movieDataResults[0];

            // Check if movie is created by the user that is requesting the rating.
            if(movieData.username === user.username)
                throw new CannotRateYourOwnMovie();
                
            // Check if user already voted for specific movie
            const _model = new RateModel();
            _model.setUsername(user.username);
            _model.setMovieId(payload.movieid);

            if(await _model.getRattings(await this._getRateFilters({limit: 1})))
                throw new UserAlreadyRated();

            // Add the ratting into the database table
            _model.setType(payload.type);
            if(!await _model.addRating())
                throw new FailedToRateMovie();

            // Increment likes or hates
            if(payload.type) {
                if(!await _movieModel.changeLike(true))
                    throw new FailedToRateMovie();
            } else {
                if(!await _movieModel.changeHate(true))
                    throw new FailedToRateMovie();
            }

            const response: ISuccessfulResponse = {
                status: true,
                httpCode: HttpCodes.CREATED,
            };
            return response;
        } catch (e) {
            if(
                !(e instanceof ExcessiveBodyProperties) &&
                !(e instanceof PropertyIsMissing) &&
                !(e instanceof InvalidPropertyType) &&
                !(e instanceof NoMovies) &&
                !(e instanceof UserAlreadyRated) &&
                !(e instanceof FailedToRateMovie) &&
                !(e instanceof CannotRateYourOwnMovie)
            ) throw e;

            const errorResource: any = { status: false, ...ObjectHandler.getResource(e) };
            const error: IFailedResponse = errorResource;
            return error;
        }
    }

    async changeRating(user: IUserProperties, payload: IRateProperties): Promise<ISuccessfulResponse | IFailedResponse> {
        try {            
            const validProperties = ['movieid', 'type'];
            if (Object.keys(payload).length > validProperties.length) throw new ExcessiveBodyProperties();

            // Check fields integrity
            if (!('movieid' in payload) || !payload.movieid) 
                throw new PropertyIsMissing('', 'movieid');
            if (!('type' in payload)) 
                throw new PropertyIsMissing('', 'type');

            if (typeof payload.movieid !== 'number') 
                throw new InvalidPropertyType('', 'number', 'movieid');
            if (typeof payload.type !== 'boolean') 
                throw new InvalidPropertyType('', 'type', 'boolean');

            // Check if the given movie id exists
            const _movieModel = new MovieModel({id: payload.movieid});
            let movieDataResults = await _movieModel.getMovies();
            if(!movieDataResults) throw new NoMovies();
            const movieData: IMovieProperties = movieDataResults[0];

            // Check if movie is created by the user that is requesting the rating.
            if(movieData.username === user.username)
                throw new CannotRateYourOwnMovie();

            // Check if user voted for specific movie
            const _model = new RateModel();
            _model.setUsername(user.username);
            _model.setMovieId(payload.movieid);

            const userRatingResults = await _model.getRattings(await this._getRateFilters({limit: 1}));
            if(!userRatingResults) throw new NoRatingFound();
            const userRating: IRateProperties = userRatingResults[0];

            // If the rating that sent is the same with the one casted before then exit
            if(userRating.type === payload.type) 
                throw new InvalidRating();

            // Change rating on rating table for specific user & movieid
            _model.setType(payload.type);
            if(!await _model.changeRatingType())
                throw new FailedToRateMovie();

            // If the user now likes the movie then subtract 1 from dislikes and add 1 to likes.
            // Else subtract 1 from likes and add 1 in dislikes
            const likesStatus = await _movieModel.changeLike(payload.type ? true : false);
            const hatesStatus = await _movieModel.changeHate(payload.type ? false : true);
            if(!likesStatus || !hatesStatus) throw new FailedToRateMovie();

            const response: ISuccessfulResponse = {
                status: true,
                httpCode: HttpCodes.OK
            };
            return response;
        } catch (e) {
            if(
                !(e instanceof ExcessiveBodyProperties) &&
                !(e instanceof PropertyIsMissing) &&
                !(e instanceof InvalidPropertyType) &&
                !(e instanceof NoMovies) &&
                !(e instanceof NoRatingFound) &&
                !(e instanceof InvalidRating) &&
                !(e instanceof FailedToRateMovie) && 
                !(e instanceof CannotRateYourOwnMovie)
            ) throw e;
            
            const errorResource: any = { status: false, ...ObjectHandler.getResource(e) };
            const error: IFailedResponse = errorResource;
            return error;
        }
    }

    async retractRating(user: IUserProperties, params: IRateProperties): Promise<ISuccessfulResponse | IFailedResponse> {
        try {
            if (!('movieid' in params) || !params.movieid) 
                throw new PropertyIsMissing('', 'movieid');
            if (!Validator.isNumber(params.movieid.toString())) 
                throw new InvalidPropertyType('', 'number', 'movieid');

            // Get the rating of user
            const _model = new RateModel({username: user.username, movieid: params.movieid});
            const userRatingResults = await _model.getRattings(await this._getRateFilters({limit: 1}));
            if(!userRatingResults) throw new NoRatingFound();
            const userRating: IRateProperties = userRatingResults[0];

            // Check if the given movie id exists
            const _movieModel = new MovieModel({id: params.movieid});
            let movieDataResults = await _movieModel.getMovies();
            if(!movieDataResults) throw new NoMovies();
            const movieData: IMovieProperties = movieDataResults[0];

            // Delete user's rating
            if(!await _model.removeRating())
                throw new FailedDeletingRating();

            // Alter hates or likes on movies table based on the rating the user previously had
            if(userRating.type) {
                if(!await _movieModel.changeLike(false))
                    throw new FailedDeletingRating();
            } else {
                if(!await _movieModel.changeHate(false))
                    throw new FailedDeletingRating();
            }
  
            const response: ISuccessfulResponse = {
                status: true,
                httpCode: HttpCodes.OK
            };
            return response;
        } catch (e) {
            if(
                !(e instanceof PropertyIsMissing) &&
                !(e instanceof InvalidPropertyType) &&
                !(e instanceof NoRatingFound) &&
                !(e instanceof NoMovies) &&
                !(e instanceof FailedDeletingRating) 
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
