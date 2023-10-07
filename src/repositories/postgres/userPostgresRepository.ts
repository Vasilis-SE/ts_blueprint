import UserRepository from '@repositories/userRepository';

export default class UserPostgresRepository extends UserRepository {
	public async storeUser(): Promise<number | boolean> {
		throw new Error('Method not implemented.');
	}
}
