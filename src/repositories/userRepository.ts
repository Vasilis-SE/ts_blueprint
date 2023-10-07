export default abstract class UserRepository {
	abstract storeUser(): Promise<number | boolean>;
}
