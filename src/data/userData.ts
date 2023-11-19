import { IProfile, IProfileDb, IUserDb } from '@interfaces/userInterfaces';
import ProfileModel from '@models/profileModel';
import UserModel from '@models/userModel';
import UserRepository from '@repositories/userRepository';

export default class UserData {
	public async storeUser(
		userRepository: UserRepository,
		user: UserModel,
		profile?: ProfileModel
	): Promise<UserModel | boolean> {
		const result: boolean | IUserDb = await userRepository.storeUser(user, profile);
		if (!result) return false;

		const newUser = new UserModel({
			id: (result as IUserDb).id,
			username: (result as IUserDb).username,
			password: (result as IUserDb).password
		});

		if (profile)
			newUser.setProfile(
				new ProfileModel({
					userid: ((result as IUserDb).profile as IProfileDb).userid,
					firstName: ((result as IUserDb).profile as IProfileDb).first_name,
					lastName: ((result as IUserDb).profile as IProfileDb).last_name,
					address: ((result as IUserDb).profile as IProfileDb).address,
					image: ((result as IUserDb).profile as IProfileDb).image
				})
			);

		return newUser;
	}

	public async getUserById(userRepository: UserRepository, userid: number): Promise<UserModel | boolean> {
		const searchedUser: boolean | IUserDb = await userRepository.getUserById(userid);
		console.log(searchedUser);


		return !searchedUser
			? false
			: new UserModel({
				id: (searchedUser as IUserDb).id,
				username: (searchedUser as IUserDb).username,
				password: (searchedUser as IUserDb).password,
				profile: {
					id: (searchedUser as IUserDb).profile?.id,
					userid: (searchedUser as IUserDb).profile?.userid,
					firstName: (searchedUser as IUserDb).profile?.first_name,
					lastName: (searchedUser as IUserDb).profile?.last_name,
					address: (searchedUser as IUserDb).profile?.address,
					image: (searchedUser as IUserDb).profile?.image,
				} as IProfile
			});
	}

	public async getUserByUsername(userRepository: UserRepository, username: string): Promise<UserModel | boolean> {
		const searchedUser: boolean | IUserDb = await userRepository.getUserByUsername(username);
		return !searchedUser
			? false
			: new UserModel({
				id: (searchedUser as IUserDb).id,
				username: (searchedUser as IUserDb).username,
				password: (searchedUser as IUserDb).password
			});
	}
	
	public async storeProfile(userRepository: UserRepository, profile: ProfileModel): Promise<ProfileModel | boolean> {
		const result: IProfileDb | boolean = await userRepository.storeProfile(profile);
		return !result ? false : profile;
	}

}
