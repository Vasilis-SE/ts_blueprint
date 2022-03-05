import { ContainsInvalidChars, ExcessiveBodyProperties, InputExceedMaxLimit, InvalidPropertyType, PropertyIsMissing } from "../exceptions/validation";
import Validator from "../helpers/validator";
import { IMovieProperties, MovieGlobals } from "../interfaces/movie";
import { IFailedResponse, ISuccessfulResponse } from "../interfaces/response";

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
  


            console.log(payload);



            // OK: check payload has excessive properties
            // OK: check payload is empty
            // OK: check properties integrity
            // OK: check properties length
            // TODO: check if movie exists

            return null;
        } catch (error) {
            console.log(error);
        }
    }

}