import { FailedToRenderHash } from '../exceptions/security';
import { UserAlreadyExists, UserCreationFailed } from '../exceptions/user';
import {
    ContainsInvalidChars,
    ExcessiveBodyProperties,
    InputExceedMaxLimit,
    InvalidPropertyType,
    PasswordIsWeak,
    PropertyIsMissing,
} from '../exceptions/validation';
import { HttpCodes } from '../helpers/httpCodesEnum';
import ObjectHandler from '../helpers/objectHandler';
import Validator from '../helpers/validator';
import { IFailedResponse, ISuccessfulResponse } from '../interfaces/response';
import { IListOfUsers, IUserProperties, UserGlobals } from '../interfaces/user';
import UserModel from '../models/user';
import Password from '../security/password';

export default class UserService {
    async createUser(payload: IUserProperties): Promise<ISuccessfulResponse | IFailedResponse> {
        try {
            const validProperties = ['username', 'password'];
            if (Object.keys(payload).length > validProperties.length)
                throw new ExcessiveBodyProperties();

            if (!('username' in payload) || !payload.username)
                throw new PropertyIsMissing('', 'username');
            if (!('password' in payload) || !payload.password)
                throw new PropertyIsMissing('', 'password');
            if (typeof payload.username !== 'string')
                throw new InvalidPropertyType('', 'string', 'username');
            if (typeof payload.password !== 'string')
                throw new InvalidPropertyType('', 'string', 'password');

            if (Validator.hasSpecialCharacters(payload.username))
                throw new ContainsInvalidChars('', 'username');
            if (payload.username.length > UserGlobals.USERNAME_MAXLENGTH)
                throw new InputExceedMaxLimit('', 'username');

            // Check if password is strong & hash it
            const _password = new Password(payload.password);
            if (!await _password.isPasswordStrong()) throw new PasswordIsWeak();
            if (!await _password.hashPassword()) throw new FailedToRenderHash();

            // Populate only the user in the model to check whether there is 
            // already any other user with the same username.
            const _model = new UserModel();
            _model.setUsername(payload.username);

            const exists: IListOfUsers | boolean = await _model.getUsers();
            if (exists) throw new UserAlreadyExists();

            // Set to model the hashed password
            _model.setPassword(_password.getPassword());
            _model.setCreatedAtStamp(Math.floor(Date.now() / 1000));
            
            if (!(await _model.createUser())) 
                throw new UserCreationFailed();

            _model.setPassword(''); // clean passowrd so that it wont be displayed on response
            const response: ISuccessfulResponse = {
                status: true,
                httpCode: HttpCodes.CREATED,
                data: ObjectHandler.getResource(_model),
            };
            return response;
        } catch (e) {
            if (
                !(e instanceof ExcessiveBodyProperties) &&
                !(e instanceof PropertyIsMissing) &&
                !(e instanceof InvalidPropertyType) &&
                !(e instanceof ContainsInvalidChars) &&
                !(e instanceof InputExceedMaxLimit) &&
                !(e instanceof PasswordIsWeak) &&
                !(e instanceof FailedToRenderHash) &&
                !(e instanceof UserAlreadyExists) &&
                !(e instanceof UserCreationFailed) 
            ) throw e;

            const errorResource: any = { status: false, ...ObjectHandler.getResource(e) };
            const error: IFailedResponse = errorResource;
            return error;
        }
    }
}
