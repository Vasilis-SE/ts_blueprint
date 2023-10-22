import { IUserDB } from "@interfaces/userInterface";
import UserModel from "@models/userModel";

export default abstract class UserRepository {
	abstract storeUser(user: UserModel): Promise<IUserDB | boolean>;
}
