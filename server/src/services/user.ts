import {
    ContainsInvalidChars,
    ExcessiveBodyProperties,
    InputExceedMaxLimit,
    InvalidEmail,
    InvalidPropertyType,
    PasswordIsWeak,
    PropertyIsMissing,
} from '../exceptions/validation';
import ObjectHandler from '../helpers/objectHandler';
import Validator from '../helpers/validator';
import { IFailedResponse, ISuccessfulResponse } from '../interfaces/response';
import { IUserProperties, UserGlobals } from '../interfaces/user';
import Password from '../security/password';

export default class UserService {
    // async createUser(payload: IUserProperties): Promise<ISuccessfulResponse | IFailedResponse> {
    //     try {
    //         const validProperties = ['username', 'password'];
    //         if (Object.keys(payload).length > validProperties.length)
    //             throw new ExcessiveBodyProperties();
    //         if (!('username' in payload) || !payload.username)
    //             throw new PropertyIsMissing('', 'username');
    //         if (!('password' in payload) || !payload.password)
    //             throw new PropertyIsMissing('', 'password');
    //         if (typeof payload.username !== 'string')
    //             throw new InvalidPropertyType('', 'string', 'username');
    //         if (typeof payload.password !== 'string')
    //             throw new InvalidPropertyType('', 'string', 'password');
    //         if (Validator.hasSpecialCharacters(payload.username))
    //             throw new ContainsInvalidChars('', 'username');
    //         if (payload.username.length > UserGlobals.USERNAME_MAXLENGTH)
    //             throw new InputExceedMaxLimit('', 'username');
    //         const _password = new Password(payload.password);
    //         if (_password.isPasswordStrong()) throw new PasswordIsWeak();
    //         return {status: true};
    //     } catch (e) {
    //         if (
    //             !(e instanceof ExcessiveBodyProperties) &&
    //             !(e instanceof PropertyIsMissing) &&
    //             !(e instanceof InvalidPropertyType) &&
    //             !(e instanceof InvalidEmail) &&
    //             !(e instanceof ContainsInvalidChars) &&
    //             !(e instanceof PasswordIsWeak) &&
    //             !(e instanceof InputExceedMaxLimit) &&
    //         )
    //             throw e;
    //         const errorResource: any = { status: false, ...ObjectHandler.getResource(e) };
    //         const error: IFailedResponse = errorResource;
    //         return error;
    //     }
    // }
}
