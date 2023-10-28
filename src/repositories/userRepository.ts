import { IUserDb } from "@interfaces/userInterfaces";
import UserModel from "@models/userModel";

export default abstract class UserRepository {
	abstract storeUser(user: UserModel): Promise<IUserDb | boolean>;
	abstract getUserById(user: UserModel): Promise<IUserDb | boolean>;
	abstract getUserByUsername(user: UserModel): Promise<IUserDb | boolean>;
}
