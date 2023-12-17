import { IUserDbExtended, IProfileDb } from '@interfaces/userInterfaces';
import ProfileModel from '@models/profileModel';
import UserModel from '@models/userModel';
import UserRepository from '@repositories/userRepository';
import Logger from '@config/logger';
import RedisConnector from '@connections/redisConnector';
import UserMapper from '@helpers/mappers/userMapper';

export default class UserRedisRepository extends UserRepository {
	getUserById(userid: number): Promise<boolean | IUserDbExtended> {
		throw new Error('Method not implemented.');
	}
	getUserByUsername(username: string): Promise<boolean | IUserDbExtended> {
		throw new Error('Method not implemented.');
	}
	getUserProfile(userid: number): Promise<boolean | IProfileDb> {
		throw new Error('Method not implemented.');
	}

	public async storeUser(user: UserModel): Promise<IUserDbExtended> {
		const newUser = UserMapper.fromUserInstanceToUserDb(user);
		const newProfile = UserMapper.fromProfileInstanceToProfileDb(
			new ProfileModel({
				userid: newUser.id,
				firstName: null,
				lastName: null,
				address: null,
				image: null
			})
		);

		const toChache: IUserDbExtended = { ...newUser, profile: newProfile };

		try {
			await RedisConnector.redis().hSet(`${process.env.REDIS_USERS_KEY}:${newUser.id}`, { ...newUser });
			// for (const [key, value] of Object.entries(newUser)) {
			// 	Logger.debug(`${process.env.REDIS_USERS_KEY}:${newUser.id} | ${key} | ${value}`, __filename)
			// }
			await RedisConnector.redis().hSet(`${process.env.REDIS_PROFILES_KEY}:${newUser.id}`, { ...newProfile  } as any);

			// for (const [key, value] of Object.entries(newProfile))
			// 	await RedisConnector.redis().hSetNX(`${process.env.REDIS_PROFILES_KEY}:${newUser.id}`, key, value as string);
		} catch (error: any) {
			Logger.error(`[UserRedisRepository|storeUserAndProfile] - ${error.message}`, __filename);
			throw error;
		}

		return toChache;
	}
}
