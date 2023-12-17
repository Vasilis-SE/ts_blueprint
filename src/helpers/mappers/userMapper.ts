import { IProfileDb, IUserDb, IUserDbExtended } from '@interfaces/userInterfaces';
import ProfileModel from '@models/profileModel';
import UserModel from '@models/userModel';

export default class UserMapper {
	public static fromUserDbExtendedToUserInstance(value: IUserDbExtended): UserModel {
		const user = new UserModel({
			id: value.id,
			username: value.username,
			password: value.password
		});

		if (value.profile)
			user.setProfile(
				new ProfileModel({
					id: value.profile.id,
					userid: value.profile.userid,
					firstName: value.profile.first_name,
					lastName: value.profile.last_name,
					address: value.profile.address,
					image: value.profile.image
				})
			);

		return user;
	}

	public static fromUserInstanceToUserDb(value: UserModel): IUserDb {
		return {
			id: value.getId(),
			username: value.getUsername(),
			password: value.getPassword()
		} as IUserDb;
	}

	public static fromProfileInstanceToProfileDb(value: ProfileModel): IProfileDb {
		return {
			id: value.getId(),
			userid: value.getUserId(),
			first_name: value.getFirstName(),
			last_name: value.getLastName(),
			address: value.getAddress(),
			image: value.getImage()
		} as IProfileDb;
	}
}
