import Logger from '@config/logger';
import UserData from '@data/userData';
import { CouldNotFindUser, UserAlreadyExists, UserCreationFailed } from '@exceptions/customExceptions';
import Base64Helper from '@helpers/base64Helper';
import { AESGCMEncryptionCredentials } from '@interfaces/securityInterfaces';
import { IUser } from '@interfaces/user';
import ProfileModel from '@models/profileModel';
import UserModel from '@models/userModel';
import UserPostgresRepository from '@repositories/postgres/userPostgresRepository';
import AESGCM from '@security/aesGcm';
import { instanceToPlain } from 'class-transformer';
import { validate } from 'class-validator';

export default class UserService {
	private userData: UserData;

	constructor() {
		this.userData = new UserData();
	}

	public async createNewUser(user: UserModel, profile?: ProfileModel): Promise<UserModel> {
		Logger.info(`Going to create user...`, __filename);

		// Validate data
		await validate(user, { skipMissingProperties: false, stopAtFirstError: true });
		if (profile) await validate(user, { skipMissingProperties: false, stopAtFirstError: true });

		// Check if user exists
		if (await this.userData.getUserByUsername(new UserPostgresRepository(), user.getUsername())) throw new UserAlreadyExists();

		const plainPassword = user.getPassword();
		const encryptedPassword = AESGCM.encrypt(plainPassword);
		user.setPassword(Base64Helper.encode(JSON.stringify(encryptedPassword)));

		// Store user
		const newUser = await this.userData.storeUser(new UserPostgresRepository(), user, profile);
		if (!newUser) throw new UserCreationFailed();

		user.setPassword(plainPassword);
		Logger.info(`New user was created: [${JSON.stringify(instanceToPlain(newUser))}]...`, __filename);
		return newUser as UserModel;
	}

	public async getUserById(userToSearch: UserModel): Promise<UserModel> {
		const user = await this.userData.getUserById(new UserPostgresRepository(), userToSearch.getId() as number);
		if (!user) throw new CouldNotFindUser();

		const base64DecodedSecret: AESGCMEncryptionCredentials = JSON.parse(
			Base64Helper.decode((user as UserModel).getPassword()),
			(key, value) => (value.type === 'Buffer' ? Buffer.from(value.data) : value)
		);

		(user as UserModel).setPassword(AESGCM.decrypt(base64DecodedSecret));
		return user as UserModel;
	}

	public async getUserByUsername(userToSearch: UserModel): Promise<UserModel> {
		const user = await this.userData.getUserByUsername(new UserPostgresRepository(), userToSearch.getUsername());
		if (!user) throw new CouldNotFindUser();

		const base64DecodedSecret: AESGCMEncryptionCredentials = JSON.parse(
			Base64Helper.decode((user as UserModel).getPassword()),
			(key, value) => (value.type === 'Buffer' ? Buffer.from(value.data) : value)
		);

		(user as UserModel).setPassword(AESGCM.decrypt(base64DecodedSecret));
		return user as UserModel;
	}

	// public async addUserProfile(profilePayload: ProfileModel): Promise<ProfileModel> {
	// 	await validate(profilePayload, { skipMissingProperties: false, stopAtFirstError: true });

	// 	// Check if user exists
	// 	if (!await this.userData.getUserById(new UserPostgresRepository(), profilePayload.getUserId()))
	// 		throw new CouldNotFindUser();

	// 	// Check if profile already exists
	// 	if (await this.userData(new UserPostgresRepository(), profilePayload.getUserId()))


	// 	// Logger.info(`New user was created: [${JSON.stringify(instanceToPlain(newUser))}]...`, __filename);
	// }

	// async loginUser(payload: IUserProperties): Promise<ISuccessfulResponse | IFailedResponse> {
	// 	try {
	// 		if (Object.keys(payload).length > 2) throw new ExcessiveBodyProperties();

	// 		// Check if any is missing
	// 		if (!('username' in payload) || !payload.username) throw new PropertyIsMissing('', 'username');
	// 		if (!('password' in payload) || !payload.password) throw new PropertyIsMissing('', 'password');

	// 		// Check data types
	// 		if (typeof payload.username !== 'string') throw new InvalidPropertyType('', 'string', 'email');
	// 		if (typeof payload.password !== 'string') throw new InvalidPropertyType('', 'string', 'password');

	// 		// Create instance of model and search for user based on the username
	// 		const _model = new UserModel();
	// 		_model.setUsername(payload.username);
	// 		const filters: IRequestQueryFilters = { limit: 1 };
	// 		const foundUserResults: any = await _model.getUsers(Filters._sqlFilters(filters));
	// 		if (!foundUserResults) throw new CouldNotFindUser();

	// 		_model.setId(foundUserResults[0].id);

	// 		// Set hashed password and compare it with the plain password.
	// 		const _password = new Password(foundUserResults[0].password);
	// 		if (!(await _password.comparePassword(payload.password))) throw new InvalidPassword();

	// 		const response: ISuccessfulResponse = {
	// 			status: true,
	// 			httpCode: HttpCodes.OK,
	// 			data: { id: foundUserResults[0].id }
	// 		};
	// 		return response;
	// 	} catch (e) {
	// 		if (
	// 			!(e instanceof ExcessiveBodyProperties) &&
	// 			!(e instanceof PropertyIsMissing) &&
	// 			!(e instanceof InvalidPropertyType) &&
	// 			!(e instanceof CouldNotFindUser) &&
	// 			!(e instanceof InvalidPassword)
	// 		)
	// 			throw e;

	// 		const errorResource: any = { status: false, ...ObjectHandler.getResource(e) };
	// 		const error: IFailedResponse = errorResource;
	// 		return error;
	// 	}
	// }

	// async logoutUser(user: IUserProperties, token: string): Promise<ISuccessfulResponse | IFailedResponse> {
	// 	try {
	// 		const _model = new UserModel(user);
	// 		if (!(await _model.deleteUserToken(token))) throw new UnableToLogout();

	// 		const response: ISuccessfulResponse = {
	// 			status: true,
	// 			httpCode: HttpCodes.OK,
	// 			data: { id: user.id }
	// 		};
	// 		return response;
	// 	} catch (e) {
	// 		if (!(e instanceof ExcessiveBodyProperties)) throw e;

	// 		const errorResource: any = { status: false, ...ObjectHandler.getResource(e) };
	// 		const error: IFailedResponse = errorResource;
	// 		return error;
	// 	}
	// }
}
