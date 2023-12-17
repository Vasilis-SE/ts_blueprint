import UserMapper from '@helpers/mappers/userMapper';
import { IProfileDb, IUserDbExtended } from '@interfaces/userInterfaces';
import ProfileModel from '@models/profileModel';
import UserModel from '@models/userModel';
import UserRepository from '@repositories/userRepository';

export default class UserData {
	
	public async storeUser(
		userRepository: UserRepository,
		user: UserModel
	): Promise<UserModel | boolean> {
		try {
			return UserMapper.fromUserDbExtendedToUserInstance(await userRepository.storeUser(user));
		} catch (error) {
			return false;
		}
	}

	public async getUserById(userRepository: UserRepository, userid: number): Promise<UserModel | boolean> {
		const searchedUser: boolean | IUserDbExtended = await userRepository.getUserById(userid);
		if (!searchedUser) return false;

		const user = new UserModel({
			id: (searchedUser as IUserDbExtended).id,
			username: (searchedUser as IUserDbExtended).username,
			password: (searchedUser as IUserDbExtended).password
		});

		if ((searchedUser as IUserDbExtended).profile)
			user.setProfile(
				new ProfileModel({
					id: ((searchedUser as IUserDbExtended).profile as IProfileDb).id,
					userid: ((searchedUser as IUserDbExtended).profile as IProfileDb).userid,
					firstName: ((searchedUser as IUserDbExtended).profile as IProfileDb).first_name,
					lastName: ((searchedUser as IUserDbExtended).profile as IProfileDb).last_name,
					address: ((searchedUser as IUserDbExtended).profile as IProfileDb).address,
					image: ((searchedUser as IUserDbExtended).profile as IProfileDb).image
				})
			);

		return user;
	}

	public async getUserByUsername(userRepository: UserRepository, username: string): Promise<UserModel | boolean> {
		const searchedUser: boolean | IUserDbExtended = await userRepository.getUserByUsername(username);
		if (!searchedUser) return false;

		const user = new UserModel({
			id: (searchedUser as IUserDbExtended).id,
			username: (searchedUser as IUserDbExtended).username,
			password: (searchedUser as IUserDbExtended).password
		});

		if ((searchedUser as IUserDbExtended).profile)
			user.setProfile(
				new ProfileModel({
					id: ((searchedUser as IUserDbExtended).profile as IProfileDb).id,
					userid: ((searchedUser as IUserDbExtended).profile as IProfileDb).userid,
					firstName: ((searchedUser as IUserDbExtended).profile as IProfileDb).first_name,
					lastName: ((searchedUser as IUserDbExtended).profile as IProfileDb).last_name,
					address: ((searchedUser as IUserDbExtended).profile as IProfileDb).address,
					image: ((searchedUser as IUserDbExtended).profile as IProfileDb).image
				})
			);

		return user;
	}

}
