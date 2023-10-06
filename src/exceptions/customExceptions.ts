import { BaseException, ExpectedPropertyException, PropertyException } from './baseExceptions';
import { HttpCodes } from '../helpers/httpCodesEnum';

export class CouldNotFindUser extends BaseException {
    constructor() {
        super('CouldNotFindUser', 'Could not find any user(-s) with the given input...', HttpCodes.NOT_FOUND);
    }
}

export class UserAlreadyExists extends BaseException {
    constructor() {
        super('UserAlreadyExists', 'User already exists with the given criteria...', HttpCodes.BAD_REQUEST);
    }
}

export class UserCreationFailed extends BaseException {
    constructor() {
        super('UserCreationFailed', 'Error occurred while trying to create new user...', HttpCodes.SERVER_ERROR);
    }
}

export class UnableToLogout extends BaseException {
    constructor() {
        super('UnableToLogout', 'Error occurred while trying to logout...', HttpCodes.SERVER_ERROR);
    }
}

export class MovieAlreadyExists extends BaseException {
    constructor() {
        super('MovieAlreadyExists', 'The same movie already exists...', HttpCodes.BAD_REQUEST);
    }
}

export class CouldNotCreateNewMovie extends BaseException {
    constructor() {
        super(
            'CouldNotCreateNewMovie',
            'Error occurred while trying to create new movie. Please try again later...',
            HttpCodes.SERVER_ERROR,
        );
    }
}

export class NoMovies extends BaseException {
    constructor() {
        super('NoMovies', 'There are no movies with the given criteria...', HttpCodes.SERVER_ERROR);
    }
}

export class UserAlreadyRated extends BaseException {
    constructor() {
        super('UserAlreadyRated', 'It seems you have already voted for that specific movie...', HttpCodes.BAD_REQUEST);
    }
}

export class FailedToRateMovie extends BaseException {
    constructor() {
        super(
            'FailedToRateMovie',
            'Error occurred while trying to rate the movie. Try again later...',
            HttpCodes.SERVER_ERROR,
        );
    }
}

export class NoRatingFound extends BaseException {
    constructor() {
        super('NoRatingFound', 'Could not find the rating you have made on the movie...', HttpCodes.NOT_FOUND);
    }
}

export class InvalidRating extends BaseException {
    constructor() {
        super('InvalidRating', 'Invalid rating that is beeing sent...', HttpCodes.BAD_REQUEST);
    }
}

export class CannotRateYourOwnMovie extends BaseException {
    constructor() {
        super('CannotRateYourOwnMovie', 'You cannot rate movies that you have created...', HttpCodes.FORBIDDEN);
    }
}

export class FailedDeletingRating extends BaseException {
    constructor() {
        super('FailedDeletingRating', 'Error occurred while trying to delete rating...', HttpCodes.SERVER_ERROR);
    }
}

export class FailedToRenderHash extends BaseException {
    constructor() {
        super('FailedToRenderHash', 'Could not render hash for password...', HttpCodes.SERVER_ERROR);
    }
}

export class InvalidTokenProvided extends BaseException {
    constructor() {
        super('InvalidTokenProvided', 'Invalid token provided on request header...', HttpCodes.SERVER_ERROR);
    }
}

export class PropertyIsMissing extends PropertyException {
    constructor(prop: string) {
        super('PropertyIsMissing', 'Property is missing from the request...', HttpCodes.NOT_FOUND, prop);
    }
}

export class ExcessiveBodyProperties extends BaseException {
    constructor() {
        super(
            'ExcessiveBodyProperties',
            'Excessive properties found inside request body. Check your payload...',
            HttpCodes.BAD_REQUEST,
        );
    }
}

export class ContainsInvalidChars extends PropertyException {
    constructor(prop: string) {
        super('ContainsInvalidChars', 'Contains invalid characters...', HttpCodes.BAD_REQUEST, prop);
    }
}

export class PasswordIsWeak extends BaseException {
    constructor() {
        super(
            'PasswordIsWeak',
            'The provided password is weak. Type using a combination of lower case, uppers case, numbers, special characters...',
            HttpCodes.BAD_REQUEST,
        );
    }
}

export class InputExceedMaxLimit extends PropertyException {
    constructor(prop: string) {
        super('InputExceedMaxLimit', 'Input exceeds max limit length...', HttpCodes.BAD_REQUEST, prop);
    }
}

export class InvalidPassword extends BaseException {
    constructor() {
        super('InvalidPassword', 'It seems the password you have provided is invalid...', HttpCodes.BAD_REQUEST);
    }
}

export class RequestBodyIsEmpty extends BaseException {
    constructor() {
        super('RequestBodyIsEmpty', 'Request body is empty. Missing all the necessary data...', HttpCodes.BAD_REQUEST);
    }
}

export class InvalidPropertyType extends ExpectedPropertyException {
    constructor(prop: string, exp: string) {
        super('InvalidPropertyType', 'Invalid property type give...', HttpCodes.BAD_REQUEST, prop, exp);
    }
}

export class InvalidParameterType extends ExpectedPropertyException {
    constructor(prop: string, exp: string) {
        super('InvalidParameterType', 'Invalid parameter type given...', HttpCodes.BAD_REQUEST, prop, exp);
    }
}

export class InvalidParameterFormat extends ExpectedPropertyException {
    constructor(prop: string, exp: string) {
        super(
            'InvalidParameterFormat',
            'It seems your parameter has invalid format...',
            HttpCodes.BAD_REQUEST,
            prop,
            exp,
        );
    }
}
