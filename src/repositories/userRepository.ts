import { IProfileDb, IUserDbExtended } from "@interfaces/userInterfaces";
import ProfileModel from "@models/profileModel";
import UserModel from "@models/userModel";

export default abstract class UserRepository {
	abstract getUserById(userid: number): Promise<IUserDbExtended | boolean>;
	abstract getUserByUsername(username: string): Promise<IUserDbExtended | boolean>;

	abstract storeUser(user: UserModel, profile?: ProfileModel): Promise<IUserDbExtended | boolean>;
	abstract storeProfile(profile: ProfileModel): Promise<IProfileDb | boolean>;
}
