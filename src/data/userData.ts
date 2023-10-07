import UserRepository from "@repositories/userRepository";

export default class UserData {
	public async storeUser(userRepository: UserRepository): Promise<number | boolean> {
		return await userRepository.storeUser();
	}
}