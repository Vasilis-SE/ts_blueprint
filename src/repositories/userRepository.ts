import { IProfileDb, IUserDb } from "@interfaces/userInterfaces";
import ProfileModel from "@models/profileModel";
import UserModel from "@models/userModel";

export default abstract class UserRepository {
	abstract storeUser(user: UserModel, profile?: ProfileModel): Promise<IUserDb | boolean>;
	abstract getUserById(userid: number): Promise<IUserDb | boolean>;
	abstract getUserByUsername(username: string): Promise<IUserDb | boolean>;
	abstract storeProfile(profile: ProfileModel): Promise<IProfileDb | boolean>;
}
