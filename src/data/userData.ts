import { IUserDb } from '@interfaces/userInterfaces';
import UserModel from '@models/userModel';
import UserRepository from '@repositories/userRepository';

export default class UserData {
	public async storeUser(userRepository: UserRepository, payload: UserModel): Promise<UserModel | boolean> {
		const newUser: boolean | IUserDb = await userRepository.storeUser(payload);
		return !newUser
			? false
			: new UserModel({
				id: (newUser as IUserDb).id,
				username: (newUser as IUserDb).username,
				password: (newUser as IUserDb).password
			});
	}

	public async getUserById(userRepository: UserRepository, user: UserModel): Promise<UserModel | boolean> {
		const searchedUser: boolean | IUserDb = await userRepository.getUserById(user);
		return !searchedUser
			? false
			: new UserModel({
				id: (searchedUser as IUserDb).id,
				username: (searchedUser as IUserDb).username,
				password: (searchedUser as IUserDb).password
			});
	}

	public async getUserByUsername(userRepository: UserRepository, user: UserModel): Promise<UserModel | boolean> {
		const searchedUser: boolean | IUserDb = await userRepository.getUserByUsername(user);
		return !searchedUser
			? false
			: new UserModel({
				id: (searchedUser as IUserDb).id,
				username: (searchedUser as IUserDb).username,
				password: (searchedUser as IUserDb).password
			});
	}
}
