import { IProfileDb, IUserDb, IUserDbExtended } from "@interfaces/userInterfaces";
import UserModel from "@models/userModel";

export default abstract class UserRepository {
	abstract getUserById(userid: number): Promise<IUserDbExtended | boolean>;
	abstract getUserByUsername(username: string): Promise<IUserDbExtended | boolean>;
	abstract getUserProfile(userid: number): Promise<IProfileDb | boolean>;

	abstract storeUser(user: UserModel): Promise<IUserDbExtended>;
}
