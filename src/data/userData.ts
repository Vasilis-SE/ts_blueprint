import { IProfileDb, IUserDbExtended } from '@interfaces/userInterfaces';
import ProfileModel from '@models/profileModel';
import UserModel from '@models/userModel';
import UserRepository from '@repositories/userRepository';

export default class UserData {
	public async storeUser(
		userRepository: UserRepository,
		user: UserModel,
		profile?: ProfileModel
	): Promise<UserModel | boolean> {
		const result: boolean | IUserDbExtended = await userRepository.storeUser(user, profile);
		if (!result) return false;

		const newUser = new UserModel({
			id: (result as IUserDbExtended).id,
			username: (result as IUserDbExtended).username,
			password: (result as IUserDbExtended).password
		});

		if (profile)
			newUser.setProfile(
				new ProfileModel({
					id: ((result as IUserDbExtended).profile as IProfileDb).id,
					userid: ((result as IUserDbExtended).profile as IProfileDb).userid,
					firstName: ((result as IUserDbExtended).profile as IProfileDb).first_name,
					lastName: ((result as IUserDbExtended).profile as IProfileDb).last_name,
					address: ((result as IUserDbExtended).profile as IProfileDb).address,
					image: ((result as IUserDbExtended).profile as IProfileDb).image
				})
			);

		return newUser;
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

	public async storeProfile(userRepository: UserRepository, profile: ProfileModel): Promise<ProfileModel | boolean> {
		const result: IProfileDb | boolean = await userRepository.storeProfile(profile);
		return !result ? false : profile;
	}
}
