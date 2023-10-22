import { IUserDB } from '@interfaces/userInterface';
import UserModel from '@models/userModel';
import UserRepository from '@repositories/userRepository';

export default class UserData {
	public async storeUser(userRepository: UserRepository, payload: UserModel): Promise<UserModel | boolean> {
		const newUser: boolean | IUserDB = await userRepository.storeUser(payload);
		return !newUser
			? false
			: new UserModel({
				id: (newUser as IUserDB).id,
				username: (newUser as IUserDB).username,
				password: (newUser as IUserDB).password
			});
	}
}
